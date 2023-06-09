'use client'

import { ActorOverview } from '@/lib/models';
import { actorEmissions, actorNextTarget, paris15Emissions, paris20Emissions } from '@/lib/util';
import { Card, CardContent, Chip } from '@mui/material';
import { FunctionComponent } from 'react';
import { Bar, BarChart, CartesianGrid, Label, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type EmissionsProps = {
  actor: ActorOverview | null;
  parts: ActorOverview[] | null;
};

type BarData = {
  id: string;
  name: string;
  emissions: number;
  hasTarget: boolean;
};

const targetYear = 2030; // for which year emissions should be displayed
const emissionsScale = 10e6; // transform to megatons

const EmissionsTooltip = ({ active = false, payload = [], label = ''}: {active?: boolean, payload?: Array<any>, label?: string}) => {
  if (!(active && payload && payload.length)) {
    return null;
  }
  console.dir(payload);
  const totalEmissions = payload.reduce((acc, value) => acc + value.value, 0);

  return (
    <div className="bg-white rounded-md p-4">
      <p>{label}</p>
      <hr />
      <p>Total</p>
      <p><span className="font-bold">{totalEmissions.toFixed(3)}</span> MtCO2eq</p>
      <hr />
      <table>
        <thead>
          <tr className="text-left">
            <th>Ref.</th>
            <th>Name</th>
            <th>MtCO2eq</th>
          </tr>
        </thead>
        <tbody>
          {payload.map(entry => (
            <tr>
              <td><span className="w-4 h-4 inline-block" style={{ backgroundColor: entry.fill }} /></td>
              <td>{entry.name}</td>
              <td className="text-right">{entry.value.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

const Emissions: FunctionComponent<EmissionsProps> = ({ actor, parts }) => {
  let data: Record<string, any>[] = [{ name: 'National' }, { name: 'Provinces' }];
  let actor15Emissions = 450; // TODO use paris15Emissions from utils
  let actor20Emissions = 550;
  let subEmissions: BarData[] = [];

  if (actor != null && parts != null) {
    const provinceData: Record<string, any> = { name: 'Provinces' };
    for (const province of parts) {
      const provinceEmissions = actorEmissions(province, targetYear) / emissionsScale;
      provinceData['emissions' + province.actor_id] = provinceEmissions;
      subEmissions.push({
        id: province.actor_id,
        name: province.name,
        emissions: provinceEmissions,
        hasTarget: actorNextTarget(province) != null,
      });
    }
    subEmissions = subEmissions.sort((a, b) => a.emissions - b.emissions);
    data = [
      { name: 'National', emissions: actorEmissions(actor, targetYear) / emissionsScale },
      provinceData,
    ];
    actor15Emissions = paris15Emissions(actor) / emissionsScale;
    actor20Emissions = paris20Emissions(actor) / emissionsScale;
  }

  return (
    <Card sx={{ minWidth: 500, minHeight: 300 }}>
      <CardContent className='items-center'>
        <p className="text-2xl"><span className="font-bold">Emissions</span> for the next national target year (2030)</p>
        <p className="text-sm text-gray-500 pb-2">Last updated in 2019</p>
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
            <Tooltip content={<EmissionsTooltip />} />
            <ReferenceLine y={actor20Emissions} ifOverflow="extendDomain" stroke="#35006A" strokeDasharray="6 4">
              <Label position="right" stroke="#35006A">2.0°C</Label>
            </ReferenceLine>
            <ReferenceLine y={actor15Emissions} ifOverflow="extendDomain" stroke="#F23D33" strokeDasharray="6 4">
              <Label position="right" stroke="#F23D33">1.5°C</Label>
            </ReferenceLine>
            <Bar dataKey="emissions" name="National Emissions" unit="Mt" stackId="a" fill="#F23D33" radius={[16, 16, 0, 0]} />
            {subEmissions.map((subEmission, i) => (
              <Bar
                dataKey={`emissions${subEmission.id}`}
                name={subEmission.name}
                key={subEmission.id}
                unit="Mt"
                stackId="a"
                fill={subEmission.hasTarget ? '#F9A200' : '#C5CBF5'}
                style={{ stroke: '#fff', strokeWidth: 1 }}
                radius={i === subEmissions.length - 1 ? [16, 16, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <p className="pb-4 text-sm">Legends</p>
        <div className="space-x-4">
          <Chip label="1.5°C Temparature Increase" style={{ backgroundColor: '#E8EAFB', color: '#001EA7' }} avatar={<span className="w-4 max-h-1.5" style={{ backgroundColor: '#F23D33' }} />} />
          <Chip label="2.0°C Temparature Increase" style={{ backgroundColor: '#E8EAFB', color: '#001EA7' }} avatar={<span className="w-4 max-h-1.5" style={{ backgroundColor: '#35006A' }} />} />
        </div>
      </CardContent>
    </Card>
  )
}

export default Emissions;
