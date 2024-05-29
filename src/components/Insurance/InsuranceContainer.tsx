import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

import { STEP0, STEP1, STEP2 } from './stepper.constant';
import { StepperBodyFirst } from './StepperBodyFirst';
import { StepperBodySecond } from './PolicyStepper/StepperBodySecond';
import { StepperBodyThird } from './PolicyStepper/StepperBodyThird';

import { useInsuranceContext } from './InsuranceContext';
import { InsuranceObjectDetailSecond } from './InsuranceObjectDetailStepper/InsuranceObjectDetailSecond';
import { InsuranceObjectDetailThird } from './InsuranceObjectDetailStepper/InsuranceObjectDetailThird';

export type InsuranceContainerProps = {};

export const InsuranceContainer: React.FC<InsuranceContainerProps> = (props) => {

  const { step, mode } = useInsuranceContext();

  const renderBody = () => {
    switch (step) {
      case 0:
        return <StepperBodyFirst />;
      case 1:
        {
          if (mode === 'add') {
            return <StepperBodySecond />;
          }
          if (mode === 'edit') {
            return <InsuranceObjectDetailSecond />;
          }
          return null;
        }
      case 2:
        {
          if (mode === 'add') {
            return <StepperBodyThird />;
          }
          if (mode === 'edit') {
            return <InsuranceObjectDetailThird />;
          }
          return null;
        }
      default:
        return null;
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step} alternativeLabel>
          <Step key={STEP0.key}>
            <StepLabel>{STEP0.label}</StepLabel>
          </Step>
          <Step key={STEP1[mode].key}>
            <StepLabel>{STEP1[mode].label}</StepLabel>
          </Step>
          <Step key={STEP2[mode].key}>
            <StepLabel>{STEP2[mode].key}</StepLabel>
          </Step>
        </Stepper>
      </Box>

      {renderBody()}
    </>
  );
}
