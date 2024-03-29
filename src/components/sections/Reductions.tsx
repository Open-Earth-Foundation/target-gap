'use client'

import { ActorOverview } from '@/lib/models';
import { actorReductions, actorNextTarget } from '@/lib/util';
import { Card, CardContent } from '@mui/material';
import { FunctionComponent } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PopperPortal from '../util/PopperPortal';

type ReductionsProps = {
  actor: ActorOverview | null;
  parts: ActorOverview[] | null;
};

type BarData = {
  id: string;
  name: string;
  reductions: number;
  hasTarget: boolean;
};

const reductionsScale = 1e6; // transform to megatons
const maxSubReductionsLength = 8;

const ReductionsTooltip = ({ active = false, payload = [], label = '' }: { active?: boolean, payload?: Array<any>, label?: string }) => {
  if (!(active && payload && payload.length)) {
    return null;
  }
  const totalReductions = payload.reduce((acc, value) => acc + value.value, 0);
  let sortedPayload = payload.sort((a, b) => b.value - a.value);
  let secondPayload = [];
  const shouldSplitSubReductions = sortedPayload.length > maxSubReductionsLength;
  if (shouldSplitSubReductions) {
    const slicePosition = Math.ceil(sortedPayload.length / 2);
    secondPayload = sortedPayload.slice(slicePosition, sortedPayload.length);
    sortedPayload = sortedPayload.slice(0, slicePosition);
  }

  const renderSubReductions = (emissions: Array<any>, showBorder: boolean = false) => (
    <table className={showBorder ? "border-[#D7D8FA] border-r" : ""}>
      <thead>
        <tr className="text-left">
          <th className="pr-2">Ref.</th>
          <th className="w-full">Name</th>
          <th className={showBorder ? "pr-4" : ""}>MtCO2eq</th>
        </tr>
      </thead>
      <tbody>
        {emissions.map(entry => (
          <tr key={entry.dataKey}>
            <td><span className="w-4 h-4 inline-block" style={{ backgroundColor: entry.fill }} /></td>
            <td>{entry.name.split('(')[0]}</td>
            <td  className={showBorder ? "pr-4 text-right" : "text-right"}>{entry.value.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );


  return (
    <PopperPortal active={active}>
      <div className="bg-white rounded-md p-4 drop-shadow-lg">
        <div className="font-bold">
          <InfoOutlinedIcon color="info" />{' '}
          <span className="h-full align-middle">{label === 'Provinces' ? 'Subnational' : label} Reductions</span>
        </div>
        <hr className="my-4 -mx-4" />
        <p className="font-bold">Total</p>
        <p className="text-xl"><span className="font-bold">{totalReductions.toFixed(3)}</span> MtCO2eq</p>
        {payload.length > 1 && (
          <>
            <hr className="my-4" />
            <div className={shouldSplitSubReductions ? "flex space-x-4" : ""}>
              {renderSubReductions(sortedPayload, shouldSplitSubReductions)}
              {shouldSplitSubReductions && renderSubReductions(secondPayload)}
            </div>
            <hr className="my-2" />
            <p className="font-bold mb-2">Key</p>
            <p className="mb-2">
              <span className="w-4 h-4 inline-block mr-6" style={{ backgroundColor: '#2351DC' }} />
              Expected value based on target
            </p>
            <p>
              <span className="w-4 h-4 inline-block mr-6" style={{ backgroundColor: '#C5CBF5' }} />
              No target; business-as-usual based on<br />
              <span className="pl-10">most recent emissions</span>
            </p>
          </>
        )}
      </div>
    </PopperPortal>
  )
};

const Reductions: FunctionComponent<ReductionsProps> = ({ actor, parts }) => {
  let data: Record<string, any>[] = [{ name: 'National' }, { name: 'Provinces' }];
  let subReductions: BarData[] = [];
  const currentYear = (new Date()).getFullYear();
  let hasMissingData = false;
  let targetYear = 2030;

  if (actor != null && parts != null) {
    const nextTarget = actorNextTarget(actor);
    const countryReductions = actorReductions(actor, currentYear, targetYear) / reductionsScale;
    if (!nextTarget || isNaN(countryReductions)) {
      hasMissingData = true;
    } else {
      if (nextTarget.target_year) {
        targetYear = nextTarget.target_year;
      }
      const provinceData: Record<string, any> = { name: 'Provinces' };
      for (const province of parts) {
        let provinceReductions = actorReductions(province, currentYear, targetYear) / reductionsScale;
        provinceReductions = isNaN(provinceReductions) ? 0 : provinceReductions;
        provinceData['reductions' + province.actor_id] = provinceReductions;
        subReductions.push({
          id: province.actor_id,
          name: province.name,
          reductions: provinceReductions,
          hasTarget: actorNextTarget(province) != null,
        });
      }
      subReductions = subReductions.sort((a, b) => a.reductions - b.reductions);
      data = [
        { name: 'National', reductions: countryReductions },
        provinceData,
      ];
    }
  }

  return (
    <Card sx={{ minWidth: 400, minHeight: 400 }} className="overflow-visible w-full lg:inline-block lg:w-1/2 mt-4 lg:mt-0">
      <CardContent className='items-center'>
        <p className="text-lg whitespace-break-spaces"><span className="font-bold">Reductions</span> for the next national target year ({targetYear})</p>
        <p className="text-xs text-gray-500 pb-2">Last updated in 2019</p>
        {hasMissingData ? (
          <p className="text-center align-center w-full my-32">Insufficient data for this country</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 10,
                right: 50,
                left: 5,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis unit="Mt" />
              <Tooltip
                content={<ReductionsTooltip />}
                allowEscapeViewBox={{ x: true, y: true }}
              />
              <Bar dataKey="reductions" name="National Reductions" unit="Mt" stackId="a" fill="#001EA7" radius={[16, 16, 0, 0]} />
              {subReductions.map((subEmission, i) => (
                <Bar
                  dataKey={`reductions${subEmission.id}`}
                  name={subEmission.name}
                  key={subEmission.id}
                  unit="Mt"
                  stackId="a"
                  fill={subEmission.hasTarget ? '#2351DC' : '#C5CBF5'}
                  style={{ stroke: '#fff', strokeWidth: 1 }}
                  radius={i === subReductions.length - 1 ? [16, 16, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default Reductions;
