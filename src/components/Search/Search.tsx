import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useInsuranceContext } from '../Insurance/InsuranceContext';

export const Searchbox=() =>{
  const { setSearchText } = useInsuranceContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }
  
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField
            label="Search input"
            InputProps={{
              type: 'search',
            }}
            onChange={handleChange}
          />
    </Stack>
  );
}

