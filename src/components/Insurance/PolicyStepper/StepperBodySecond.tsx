

import { TemplateForm } from '../../TemplateForm/TemplateForm';
import insureData from '../../../configure/insureData.json';
import { addPolicy, getPolicies, updatePolicy, deletePolicy } from '../../../store/indexedDB';
import { useInsuranceContext } from '../InsuranceContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


const STEPPER_BODY_SECOND_STEP_ID = 'stepper-body-second';
export const StepperBodySecond = () => {
  const { setStep } = useInsuranceContext();

  const onSubmit = async (data: any) => {
    await addPolicy(data);
    setStep(2);
  }

  return (
    <>
      <Stack
        direction="column"
        justifyContent='center'
      >
        <Box
          sx={{
            marginBottom: '1rem',
            width: '100vw',
          }}
        >
          <TemplateForm
            id={STEPPER_BODY_SECOND_STEP_ID}
            mode='create'
            config={insureData}
            onSubmit={onSubmit}
          />
        </Box>

        <Stack
          direction="row"
          justifyContent='center'
        >

          <Button
            variant="contained"
            sx={{
              marginLeft: '1rem',
            }}
            children="Back"
            onClick={() => setStep(0)}
          />
          <Button
            variant="contained"
            sx={{
              marginLeft: '1rem',
            }}
            children="Next"
            type="submit"
            form={STEPPER_BODY_SECOND_STEP_ID}
          />
        </Stack>
      </Stack>
    </>
  );
}
