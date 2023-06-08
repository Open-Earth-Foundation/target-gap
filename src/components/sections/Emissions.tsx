'use client'

import { ActorEmissionsMap, ActorPart } from '@/lib/models';
import { Card, CardContent } from '@mui/material';
import { FunctionComponent } from 'react';

type EmissionsProps = {
  actor: ActorEmissionsMap;
  parts: Map<ActorPart, ActorEmissionsMap>;
};

const Emissions: FunctionComponent<EmissionsProps> = ({actor, parts}) => {
  return(
    <Card sx={{ minWidth: 275 }}>
      <CardContent className='flex items-center h-full'>
        <p className='text-3xl'><span className="font-bold">Emissions</span> for the next national target year (2030)</p>
        
        {/* Graph can go here */}
      </CardContent>
    </Card>
  )
}

export default Emissions;
