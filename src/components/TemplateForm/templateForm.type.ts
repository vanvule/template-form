export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  type?: 'number' | 'date' | 'text';
  custom?: (value: string) => boolean;
  afterStartDate?: boolean;
  errorMessage?: string;
}


export interface FieldConfig {
  name: string;
  content: string;
  defaultValue?: string;
  type: string;
  disable?: boolean;
  freeze?: boolean;
  validation?: FieldValidation;
  options?: { value: string; label: string }[];
}

export interface FormConfig {
  fields: FieldConfig[];
}

export interface PolicyData {
  [key: string]: any;
}

export type FormMode = 'create' | 'edit' | 'read';
