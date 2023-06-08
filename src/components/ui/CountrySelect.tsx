'use client'

import { ActorPart } from '@/lib/models';
import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FunctionComponent } from 'react';

type CountrySelectProps = {
  countries: ActorPart[];
  onSelected: (actorId: string) => void;
}

const CountrySelect: FunctionComponent<CountrySelectProps> = ({countries, onSelected}) => {
  const handleCountryChanged = (_event: any, value: { label: string, id: string} | null, reason: string) => {
    if (value && reason === 'selectOption') {
      onSelected(value.id);
    }
  }
  
  const options = countries.map((country) => ({ label: country.name, id: country.actor_id }));

  return (
    <FormControl className="min-w-[50%]">
      <p className="text-sm pb-4">Search for a country</p>
      <Autocomplete
        disablePortal
        id="country-autocomplete"
        options={options}
        sx={{ width: 300 }}
        autoSelect={true}
        blurOnSelect={true}
        autoComplete={true}
        autoHighlight={true}
        onChange={handleCountryChanged}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Country" defaultValue="You can type here" />}
      />
    </FormControl>
  );
};

export default CountrySelect;

