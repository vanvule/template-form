
import { DataGrid } from '../DataTable/DataTable';
import { Searchbox } from '../Search/Search';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useInsuranceContext } from './InsuranceContext';

export type StepperBodyFirstProps = {

}

export const StepperBodyFirst: React.FC<StepperBodyFirstProps> = (props) => {

  const { setMode, setStep } = useInsuranceContext();
  const { selectedRow } = useInsuranceContext();


  const handleAddNewInsuredObject = () => {
    setMode('add');
    setStep(1);
  }

  const handleEditInsuredObject = () => {
    setMode('edit');
    setStep(1);
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent='end'
      >
        <Searchbox />
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
          }}
          children="Add"
          onClick={handleAddNewInsuredObject}
        />
      </Stack>
      <DataGrid />
      <Stack
        direction="row"
        justifyContent='end'
      >
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
          }}
          children="Next"
          disabled={!selectedRow}
          onClick={handleEditInsuredObject}
        />
      </Stack>
    </>
  );
}
