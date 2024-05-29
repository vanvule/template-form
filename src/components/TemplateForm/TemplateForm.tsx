import React, { useRef, useState, useEffect } from 'react';
import { FieldConfig, FormConfig, FormMode, PolicyData } from './templateForm.type';
import styles from './TemplateForm.module.scss';

interface TemplateFormProps {
  id: string;
  mode: FormMode;
  config: FormConfig;
  policy?: PolicyData;
  btnText?: string;
  onSubmit: (data: PolicyData) => void;
}

export const TemplateForm: React.FC<TemplateFormProps> = (props) => {
  const formDataRef = useRef<PolicyData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { id, mode, config, policy } = props;
  const { onSubmit } = props;

  useEffect(() => {
    if (policy) {
      formDataRef.current = policy;
    }
  }, [policy]);

  useEffect(() => {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
      // @ts-ignore
      if (policy && input.name in policy) {
        // @ts-ignore
        (input as HTMLInputElement).value = policy[input.name] || '';
      }
    });
  }, [policy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    formDataRef.current = {
      ...formDataRef.current,
      [name]: value
    };
    validateField(name, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { name, value } = e.currentTarget;
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    const field = config.fields.find(field => field.name === name);
    if (!field) return;

    const { validation } = field;
    const newErrors: { [key: string]: string } = { ...errors };

    if (validation?.required && !value) {
      newErrors[name] = 'Trường này là bắt buộc';
    }
    else if (validation?.minLength && value.length < validation.minLength) {
      newErrors[name] = `Phải có ít nhất ${validation.minLength} ký tự`;
    }
    else if (validation?.maxLength && value.length > validation.maxLength) {
      newErrors[name] = `Không được vượt quá ${validation.maxLength} ký tự`;
    }
    else if (validation?.pattern && !new RegExp(validation.pattern).test(value)) {
      newErrors[name] = validation.errorMessage || 'Định dạng không hợp lệ';
    }
    else if (validation?.type === 'number' && isNaN(Number(value))) {
      newErrors[name] = 'Phải là một số';
    }
    else if (validation?.type === 'date' && isNaN(Date.parse(value))) {
      newErrors[name] = 'Phải là một ngày hợp lệ';
    }
    else if (validation?.afterStartDate && value) {
      const startDate = formDataRef.current['startDate'];
      if (startDate && new Date(value) <= new Date(startDate)) {
        newErrors[name] = 'Ngày kết thúc phải sau ngày bắt đầu';
      }
    }
    else if (validation?.custom && !validation.custom(value)) {
      newErrors[name] = validation.errorMessage || 'Giá trị không hợp lệ';
    }
    else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    config.fields.forEach(field => {
      const { name } = field;
      const value = formDataRef.current[name];
      validateField(name, value);
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode !== 'read' && validate()) {
      onSubmit(formDataRef.current);
    }
  };

  const renderField = (field: FieldConfig) => {
    const { name, content, defaultValue, type, validation, options, freeze, disable } = field;
    const isReadMode = mode === 'read';
    const isRequired = validation?.required;

    return (
      <div key={name} className={styles['form-field']}>
        <label>
          {content}
          {isRequired && '*'}
        </label>
        {type === 'select' ? (
          <select
            name={name}
            value={formDataRef.current[name] || ''}
            onChange={handleChange}
            disabled={isReadMode || disable || freeze}
          >
            <option value="">Select...</option>
            {options && options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formDataRef.current[name] || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isReadMode || disable}
            readOnly={freeze}
          />
        )}
        {errors[name] && <span className={styles['error-message']}>{errors[name]}</span>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles['form-container']} id={id}>
      {config.fields.map(renderField)}
    </form>
  );
};
