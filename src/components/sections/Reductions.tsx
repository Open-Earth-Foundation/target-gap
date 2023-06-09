'use client'

import { ActorOverview } from '@/lib/models';
import { actorReductions, actorNextTarget } from '@/lib/util';
import { Card, CardContent } from '@mui/material';
import { FunctionComponent } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

const targetYear = 2030; // for which year reductions should be displayed
const reductionsScale = 1e6; // transform to megatons

const ReductionsTooltip = ({ active = false, payload = [], label = '' }: { active?: boolean, payload?: Array<any>, label?: string }) => {
  if (!(active && payload && payload.length)) {
    return null;
  }
  const totalReductions = payload.reduce((acc, value) => acc + value.value, 0);
  const sortedPayload = payload.sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-md p-4 drop-shadow-lg">
      <div className="font-bold">
        <InfoOutlinedIcon color="info" />{' '}
        <span className="h-full align-middle">{label === 'Provinces' ? 'Subnational' : label} Reductions</span>
      </div>
      <hr className="my-4" />
      <p className="font-bold">Total</p>
      <p className="text-xl"><span className="font-bold">{totalReductions.toFixed(3)}</span> MtCO2eq</p>
      {payload.length > 1 && (
        <>
          <hr className="my-4" />
          <table>
            <thead>
              <tr className="text-left">
                <th className="pr-2">Ref.</th>
                <th className="w-5/6">Name</th>
                <th>MtCO2eq</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayload.map(entry => (
                <tr key={entry.dataKey}>
                  <td><span className="w-4 h-4 inline-block" style={{ backgroundColor: entry.fill }} /></td>
                  <td>{entry.name}</td>
                  <td className="text-right">{entry.value.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="my-2" />
          <p className="font-bold mb-2">Key</p>
          <p className="mb-2">
            <span className="w-4 h-4 inline-block mr-6" style={{ backgroundColor: '#F9A200' }} />
            Expected value based on target
          </p>
          <p>
            <span className="w-4 h-4 inline-block mr-6" style={{ backgroundColor: '#C5CBF5' }} />
            No target; business-as-usual based on<br />
            <span className="pl-10">most recent reductions</span>
          </p>
        </>
      )}
    </div>
  )
};

const Reductions: FunctionComponent<ReductionsProps> = ({ actor, parts }) => {
  let data: Record<string, any>[] = [{ name: 'National' }, { name: 'Provinces' }];
  let subReductions: BarData[] = [];
  const currentYear = (new Date()).getFullYear();

  if (actor != null && parts != null) {
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
      { name: 'National', reductions: actorReductions(actor, currentYear, targetYear) / reductionsScale },
      provinceData,
    ];
  }

  return (
    <Card sx={{ minWidth: 500, minHeight: 300 }} className="overflow-visible">
      <CardContent className='items-center'>
        <p className="text-lg"><span className="font-bold">Reductions</span> for the next national target year (2030)</p>
        <p className="text-xs text-gray-500 pb-2">Last updated in 2019</p>
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
              wrapperStyle={{ zIndex: 1000 }}
              allowEscapeViewBox={{ x: true, y: true }}
              position={{ x: -250, y: -100 }}
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
      </CardContent>
    </Card>
  )
}

export default Reductions;
