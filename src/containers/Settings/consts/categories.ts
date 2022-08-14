import {
  AutoStories,
  Class,
  ManageAccounts,
  PeopleAlt,
  SvgIconComponent,
} from '@mui/icons-material';

interface SettingCategory {
  label: string;
  Icon: SvgIconComponent;
  route: string;
}

export const categories: SettingCategory[] = [
  {
    label: 'categories.subjectCategories',
    Icon: Class,
    route: 'subject-categories',
  },
  {
    label: 'categories.classrooms',
    Icon: PeopleAlt,
    route: 'classrooms',
  },
  {
    label: 'categories.subjects',
    Icon: AutoStories,
    route: 'subjects',
  },
  {
    label: 'categories.users',
    Icon: ManageAccounts,
    route: 'users',
  },
];
