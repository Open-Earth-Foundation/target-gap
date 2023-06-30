'use client';

import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FunctionComponent } from 'react';

type CountrySelectProps = {
  countries: { name: string, id: string }[];
  onSelected: (actorId: string) => void;
}

const CountrySelect: FunctionComponent<CountrySelectProps> = ({ countries, onSelected }) => {
  const handleCountryChanged = (_event: any, value: { label: string, id: string } | null, reason: string) => {
    if (value && reason === 'selectOption') {
      onSelected(value.id);
    }
  }

  const options = countries.map((country) => ({ label: country.name, id: country.id }));

  return (
    <FormControl>
      <p className="text-sm pb-2">Search for a country</p>
      <Autocomplete
        disablePortal
        id="country-autocomplete"
        options={options}
        sx={{ width: 365 }}
        autoSelect={true}
        blurOnSelect={true}
        autoComplete={true}
        autoHighlight={true}
        onChange={handleCountryChanged}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.label} ({option.id})
          </li>
        )}
        getOptionLabel={option => `${option.label} (${option.id})`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
    </FormControl>
  );
};

export default CountrySelect;
