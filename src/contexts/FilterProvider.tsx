import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { Filters } from '~/types';

const FilterContext = createContext<Filters | undefined>(undefined);

const SetFilterContext = createContext<React.Dispatch<React.SetStateAction<Filters>> | undefined>(undefined);

function FilterProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<Filters>(() => ({ author: undefined, publisher: undefined }));

  return (
    <FilterContext.Provider value={filters}>
      <SetFilterContext.Provider value={setFilters}>{children}</SetFilterContext.Provider>
    </FilterContext.Provider>
  );
}

function useFilters() {
  const filters = useContext(FilterContext);

  if (filters === undefined) {
    throw new Error('useFilters must be used inside a FilterProvider');
  }
  return filters;
}

function useSetFilters() {
  const setFilters = useContext(SetFilterContext);

  if (setFilters === undefined) {
    throw new Error('useSetFilters must be used inside a FilterProvider');
  }

  return setFilters;
}

export { FilterProvider, useFilters, useSetFilters };
