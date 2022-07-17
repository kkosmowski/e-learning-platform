import { ReactNode } from 'react';

interface TabPanelProps<T> {
  value: T;
  currentTab: T;
  children: ReactNode;
}

export default function TabPanel<T>(props: TabPanelProps<T>) {
  const { value, children, currentTab } = props;
  return value === currentTab ? <>{children}</> : null;
}
