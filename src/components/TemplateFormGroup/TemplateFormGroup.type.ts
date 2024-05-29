export interface FormControlLabelConfig {
  status: string;
  name: string;
  mode: string;
  label: string;
  subLabel: string;
  fee: number;
  type: string;
  isStored: boolean;
}

export interface FieldConfig {
  name: string;
  content: string;
  formControlLabel: FormControlLabelConfig[];
}

export interface FormConfig {
  fields: FieldConfig[];
}

export interface TemplateFormGroupProps {
  data: FormConfig;
  id: string;
  onSubmit: (data: Record<string, number>) => void;
}