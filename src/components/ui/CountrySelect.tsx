'use client'

import { ActorPart } from '@/lib/models';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FunctionComponent, useState } from 'react';

type CountrySelectProps = {
  countries: ActorPart[];
  onSelected: (actorId: string) => void;
}

const CountrySelect: FunctionComponent<CountrySelectProps> = ({countries, onSelected}) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const handleCountryChanged = (event: SelectChangeEvent<null>) => {
    const newCountry = event.target.value;
    if (newCountry) {
      setSelectedCountry(newCountry);
      onSelected(newCountry);
    }
  }

  return (
    <FormControl className="min-w-[50%]">
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        labelId="country-select-label"
        id="country-select"
        value={selectedCountry as any}
        label="Country"
        onChange={handleCountryChanged}
      >
        <MenuItem value="">Please select a country...</MenuItem>
        {countries.map((country: ActorPart) => (
          <MenuItem value={country.actor_id} key={country.actor_id}>{country.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelect;

