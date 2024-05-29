import React, { createContext, useState, ReactNode, useContext } from 'react';
import { rowData } from '../DataTable/DataTable';

type InsuranceState = {
  step: number;
  selectedRow?: rowData;
  mode: 'add' | 'edit';
  searchText: string;
  totalFee?: number;
};

type InsuranceContextType = InsuranceState & {
  setState: (state: Partial<InsuranceState>) => void;
  setStep: (step: number) => void;
  setSelectedRow: (row: rowData|undefined) => void;
  setMode: (mode: 'add' | 'edit') => void;
  setSearchText: (searchText: string) => void;
  setTotalFee?: (totalFee: number) => void;
};

const defaultState: InsuranceState = {
  step: 0,
  selectedRow: undefined,
  mode: 'add',
  searchText: '',
  totalFee: 0,
};

const InsuranceContext = createContext<InsuranceContextType>({
  ...defaultState,
  setState: () => {},
  setStep: () => {},
  setSelectedRow: () => {},
  setMode: () => {},
  setSearchText: () => {},
  setTotalFee: () => {},
});

const InsuranceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<InsuranceState>(defaultState);

  const updateState = (newState: Partial<InsuranceState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const setStep = (step: number) => {
    updateState({ step });
  };

  return (
    <InsuranceContext.Provider
      value={{
        ...state,
        setState: updateState,
        setStep,
        setSelectedRow: (selectedRow) => updateState({ selectedRow }),
        setMode: (mode) => updateState({ mode }),
        setSearchText: (searchText) => updateState({ searchText }),
        setTotalFee: (totalFee) => updateState({ totalFee }),
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
};

const useInsuranceContext = () => {
  return useContext(InsuranceContext);
};

export { InsuranceContext, InsuranceProvider, useInsuranceContext };
