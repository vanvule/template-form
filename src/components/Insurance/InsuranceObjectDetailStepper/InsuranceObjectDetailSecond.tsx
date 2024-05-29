

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import insureData from '../../../configure/insureData.json';
import { updatePolicy } from '../../../store/indexedDB';
import { TemplateForm } from '../../TemplateForm/TemplateForm';
import { useInsuranceContext } from '../InsuranceContext';

const INSURANCE_OBJECT_DETAIL_SECOND_STEP_ID = 'insurance-object-detail-second';
export const InsuranceObjectDetailSecond = () => {
  const { selectedRow } = useInsuranceContext();
  const { setMode, setStep, setSelectedRow } = useInsuranceContext();

  const onSubmit = async (data: any) => {
    await updatePolicy(selectedRow?.id, data);
    setMode('edit');
    setStep(2);
  }

  return (
    <>
      <TemplateForm
        id={INSURANCE_OBJECT_DETAIL_SECOND_STEP_ID}
        mode='edit'
        config={insureData}
        policy={selectedRow}
        onSubmit={onSubmit}
      />
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
          onClick={() => {
            setSelectedRow(undefined);
            setStep(0);
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
          }}
          children="Next"
          type="submit"
          form={INSURANCE_OBJECT_DETAIL_SECOND_STEP_ID}
        />
      </Stack>
    </>
  );
}
