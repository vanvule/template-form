export interface Column {
  id: 'no' | 'fullName' | 'identification' | 'age' | 'gender' | 'relationship' | 'insurePackage' | 'startDate' | 'endDate' | 'fee';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  {
    id: 'no',
    label: 'No.',
    minWidth: 70
  },
  {
    id: 'fullName',
    label: 'Full Name',
    minWidth: 100
  },
  {
    id: 'identification',
    label: 'ID/Pasport Number',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'age',
    label: 'Age',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 70,
  },
  {
    id: 'relationship',
    label: 'Relationship',
    minWidth: 70,
  },
  {
    id: 'insurePackage',
    label: 'Package',
    minWidth: 100,
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 100,
  },
  {
    id: 'endDate',
    label: 'End Date',
    minWidth: 100,
  },
  {
    id: 'fee',
    label: 'Fee',
    minWidth: 70,
    format: (value: number) => { return `$${value.toFixed(2)}` },
  },
];