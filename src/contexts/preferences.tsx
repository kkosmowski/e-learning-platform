import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { useLocalStorage } from 'shared/hooks';
import { groupByKey, GroupSubjectsBy } from 'shared/consts/shared';

interface PreferencesContextState {
  groupBy: GroupSubjectsBy;
  setGroupBy: (groupBy: GroupSubjectsBy) => void;
}

export const PreferencesContext = createContext<PreferencesContextState>({
  groupBy: GroupSubjectsBy.None,
  setGroupBy: () => {},
});

interface PreferencesProviderProps {
  children: ReactNode;
}

export function usePreferences() {
  return useContext(PreferencesContext);
}

const defaultGroupBy = GroupSubjectsBy.None;

export function PreferencesProvider(props: PreferencesProviderProps) {
  const { children } = props;
  const { set, get } = useLocalStorage();
  const [groupBy, setGroupBy] = useState<GroupSubjectsBy>(
    get<GroupSubjectsBy>(groupByKey) || defaultGroupBy
  );

  const setNewGroupBy = useCallback(
    (newGroupBy: GroupSubjectsBy) => {
      set(groupByKey, newGroupBy);
      setGroupBy(newGroupBy);
    },
    [set]
  );

  const value: PreferencesContextState = {
    groupBy,
    setGroupBy: setNewGroupBy,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
