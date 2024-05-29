

import { TemplateForm } from '../../TemplateForm/TemplateForm';
import { addPolicy, getPolicies, getPolicy, updatePolicy, deletePolicy } from '../../../store/indexedDB';
import { useInsuranceContext } from '../InsuranceContext';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TemplateFormGroup } from '../../TemplateFormGroup/TemplateFormGroup';

import insurePackage from '../../../configure/insurePackage.json';
import insureBenefit from '../../../configure/insureBenefit.json';

const INSURANCE_OBJECT_DETAIL_THIRD_STEP_ID = 'insurance-object-detail-third';
const INSURANCE_OBJECT_DETAIL_THIRD_STEP_FORM_CONTROL_ID = 'insurance-object-detail-third-form-control';

const GOLDEN = 'Golden';
const SILVER = 'Silver';
const BRONZE = 'Bronze';
const GOLDEN_FEE = 500;
const SILVER_FEE = 300;
const BRONZE_FEE = 150;

export const InsuranceObjectDetailThird = () => {
  const { selectedRow } = useInsuranceContext();
  const { setMode, setStep, setTotalFee } = useInsuranceContext();

  const [policy, setPolicy] = useState<any>(null);
  const [policyForm, setPolicyForm] = useState<{insurePackage: string, startDate: string, endDate: string} | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const policy = await getPolicy(selectedRow?.id);

      setPolicy(policy);
    }
    fetchData();
  }, [selectedRow]);

  useEffect(() => {
    if (policy) {
      const { insurePackage, startDate, endDate } = policy;
      setPolicyForm({ insurePackage, startDate, endDate });
    }
  }, [policy]);

  const calculateFee = (data: string | Record<string, number>): number => {
    if (typeof data === 'string') {
      if (data === GOLDEN) {
        return GOLDEN_FEE;
      }
      else if (data === SILVER) {
        return SILVER_FEE;
      }
      else if (data === BRONZE) {
        return BRONZE_FEE;
      }
      return 0;
    } else {
      return Object.keys(data).reduce((acc, key) => {
        if (data[key]) {
          return acc + data[key];
        }
        return acc;
      }, 0);
    }
  };


  const onSubmit = async (data: any) => {
    const { insurePackage, ...rest } = data;
    const fee = calculateFee(insurePackage);
    const updatedPolicy = { ...policy, ...data, fee: fee };
    await updatePolicy(selectedRow?.id, updatedPolicy);

  }

  const onSubmitBenefitForm = async (data: any) => {
    const currentPolicy = await getPolicy(selectedRow?.id);
    const totalFee = calculateFee(data) + currentPolicy.fee;
    const updatedPolicy = { ...currentPolicy, fee: totalFee };
    await updatePolicy(selectedRow?.id, updatedPolicy);

    const policies = await getPolicies();
    const allTotalFee = policies.reduce((acc, policy) => acc + policy.fee, 0);

    // @ts-ignore
    setTotalFee(allTotalFee || 0 as number);
    setMode('edit');
    setStep(0);
  }

  const handleSubmit = async () => {
    const form1 = document.getElementById(INSURANCE_OBJECT_DETAIL_THIRD_STEP_ID) as HTMLFormElement;
    const form2 = document.getElementById(INSURANCE_OBJECT_DETAIL_THIRD_STEP_FORM_CONTROL_ID) as HTMLFormElement;

    if (form1 && form2) {
      await form1.requestSubmit();
      await form2.requestSubmit();
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
      >
        <TemplateForm
          id={INSURANCE_OBJECT_DETAIL_THIRD_STEP_ID}
          mode='edit'
          policy={policyForm}
          config={insurePackage}
          onSubmit={onSubmit}
        />

        <TemplateFormGroup
          id={INSURANCE_OBJECT_DETAIL_THIRD_STEP_FORM_CONTROL_ID}
          data={insureBenefit}
          onSubmit={onSubmitBenefitForm}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="end"
      >
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
            width: '20%',
          }}
          children="Save"
          onClick={handleSubmit}
        />
      </Stack>
    </>
  );
}
