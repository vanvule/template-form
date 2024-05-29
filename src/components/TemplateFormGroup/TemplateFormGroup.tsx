import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TemplateFormGroupProps } from './TemplateFormGroup.type';

import styles from './TemplateFormGroup.module.scss';

/**
 * TemplateFormGroup component renders a group of checkboxes based on the provided configuration.
 * 
 * Usage:
 * ```tsx
 * import { TemplateFormGroup } from './TemplateFormGroup';
 * 
 * const formGroupData = {
 *   fields: [
 *     {
 *       name: 'group1',
 *       content: 'Group 1',
 *       formControlLabel: [
 *         { name: 'field1', label: 'Field 1', subLabel: 'SubLabel 1', status: 'checked', fee: 10, isStored: true, mode: 'edit' },
 *         { name: 'field2', label: 'Field 2', subLabel: 'SubLabel 2', status: 'unchecked', fee: 20, isStored: false, mode: 'edit' }
 *       ]
 *     },
 *     {
 *       name: 'group2',
 *       content: 'Group 2',
 *       formControlLabel: [
 *         { name: 'field3', label: 'Field 3', subLabel: 'SubLabel 3', status: 'checked', fee: 30, isStored: true, mode: 'read' },
 *         { name: 'field4', label: 'Field 4', subLabel: 'SubLabel 4', status: 'unchecked', fee: 40, isStored: false, mode: 'edit' }
 *       ]
 *     }
 *   ]
 * };
 * 
 * const handleFormGroupSubmit = (storedData) => {
 *   console.log('Stored data:', storedData);
 * };
 * 
 * <TemplateFormGroup
 *   id="myFormGroup"
 *   data={formGroupData}
 *   onSubmit={handleFormGroupSubmit}
 * />
 * ```
 * 
 * @param {TemplateFormGroupProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered form group component.
 */
export const TemplateFormGroup: React.FC<TemplateFormGroupProps> = (props) => {
  const { id, data, onSubmit } = props;

  const [formState, setFormState] = useState(() => {
    const initialState: Record<string, boolean> = {};
    data.fields.forEach(group => {
      group.formControlLabel.forEach(field => {
        initialState[field.name] = field.status === 'checked';
      });
    });
    return initialState;
  });

  const handleChange = (name: string, fee: number, isStored: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: checked
    }));

    if (isStored) {
      
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const storedData: Record<string, number> = {};
    data.fields.forEach(group => {
      group.formControlLabel.forEach(field => {
        if (field.isStored && formState[field.name]) {
          storedData[field.name] = field.fee;
        }
      });
    });
    onSubmit(storedData);
  };

  return (
    <form onSubmit={handleSubmit} id={id} className={styles['form-group-container']}>
      {data.fields.map(group => (
        <FormGroup key={group.name}>
          <h3>{group.content}</h3>
          {group.formControlLabel.map(field => (
            <FormControlLabel
              key={field.name}
              control={
                <Checkbox
                  checked={formState[field.name]}
                  onChange={handleChange(field.name, field.fee, field.isStored)}
                  disabled={field.mode === 'read'}
                />
              }
              label={
                <div>
                  <div>{field.label}</div>
                  <div style={{ fontSize: 'smaller' }}>{field.subLabel}</div>
                </div>
              }
            />
          ))}
        </FormGroup>
      ))}
    </form>
  );
};
