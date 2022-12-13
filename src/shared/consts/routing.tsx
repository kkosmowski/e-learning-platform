import { Navigate } from 'react-router-dom';

import Home from 'containers/Home';
import Settings, {
  CreateClass,
  ClassDetails,
  ClassesManagement,
  SettingsLayout,
  SubjectCategoriesManagement,
  SubjectsManagement,
  SubjectDetails,
  CreateSubject,
  Users,
  UserDetails,
  CreateUser,
} from 'containers/Settings';
import UsersManagement from 'containers/Settings/components/UsersManagement';
import SubjectOverview, {
  SubjectLayout,
  CreateNotice,
  CreateTask,
  EditNotice,
  EditTask,
} from 'containers/Subject';
import NoticeBoard from 'containers/NoticeBoard';
import Notice from 'containers/Notice';
import TaskList from 'containers/TaskList';
import Task from 'containers/Task';
import SubjectGrades from 'containers/SubjectGrades';
import Subjects from 'containers/Subjects';
import AssignNewGrade from 'containers/teacher/AssignNewGrade';
import TeacherGuard from 'shared/guards/TeacherGuard';
import { RouteObjectWithId } from 'shared/types/routing';
import { TaskType } from 'shared/types/task';
import { Role } from 'shared/types/user';
import StudentSubjectGrades from '../../containers/StudentSubjectGrades';

export const features: RouteObjectWithId[] = [
  {
    path: '/',
    id: 'home',
    element: <Home />,
  },
  {
    path: 'subjects',
    id: 'subjects',
    limitedTo: [Role.Student, Role.Teacher],
    children: [
      {
        path: '',
        element: <Subjects />,
      },
      {
        path: ':subjectId',
        element: <SubjectLayout />,
        children: [
          {
            path: '',
            element: <SubjectOverview />,
          },
          {
            path: 'notices',
            children: [
              {
                path: '',
                element: <NoticeBoard />,
              },
              {
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="/404">
                    <CreateNotice />
                  </TeacherGuard>
                ),
              },
              {
                path: ':noticeId',
                children: [
                  {
                    path: '',
                    element: <Notice />,
                  },
                  {
                    path: 'edit',
                    element: (
                      <TeacherGuard redirectTo="/404">
                        <EditNotice />
                      </TeacherGuard>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: 'tasks',
            children: [
              {
                path: '',
                element: <TaskList type={TaskType.Task} />,
              },
              {
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="/404">
                    <CreateTask type={TaskType.Task} />
                  </TeacherGuard>
                ),
              },
              {
                path: ':taskId',
                children: [
                  {
                    path: '',
                    element: <Task />,
                  },
                  {
                    path: 'edit',
                    element: (
                      <TeacherGuard redirectTo="/404">
                        <EditTask />
                      </TeacherGuard>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: 'homework',
            children: [
              {
                path: '',
                element: <TaskList type={TaskType.Homework} />,
              },
              {
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="/404">
                    <CreateTask type={TaskType.Homework} />
                  </TeacherGuard>
                ),
              },
              {
                path: ':taskId',
                children: [
                  {
                    path: '',
                    element: <Task />,
                  },
                  {
                    path: 'edit',
                    element: (
                      <TeacherGuard redirectTo="/404">
                        <EditTask />
                      </TeacherGuard>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: 'grades',
            children: [
              {
                path: '',
                element: <SubjectGrades />,
              },
              {
                path: 'new',
                element: (
                  <TeacherGuard redirectTo="/404">
                    <AssignNewGrade />
                  </TeacherGuard>
                ),
              },
              {
                path: ':studentId',
                element: (
                  <TeacherGuard redirectTo="/404">
                    <StudentSubjectGrades />
                  </TeacherGuard>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path: 'profile',
  //   element: <Profile />,
  // },
  {
    path: 'settings',
    element: <SettingsLayout limitedTo={Role.Admin} />,
    id: 'settings',
    limitedTo: Role.Admin,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            element: <Settings />,
          },
          {
            path: 'subject-categories',
            element: <SubjectCategoriesManagement />,
          },
          {
            path: 'classes',
            children: [
              {
                path: '',
                element: <ClassesManagement />,
              },
              {
                path: 'create',
                element: <CreateClass />,
              },
              {
                path: ':id',
                children: [
                  {
                    path: '',
                    element: <ClassDetails mode="view" />,
                  },
                  {
                    path: 'edit',
                    element: <ClassDetails mode="edit" />,
                  },
                ],
              },
            ],
          },
          {
            path: 'users',
            element: <UsersManagement />,
            children: [
              {
                path: 'create',
                element: <CreateUser />,
              },
              {
                path: ':type',
                element: <Users />,
              },
            ],
          },
          {
            path: 'user',
            children: [
              {
                path: '',
                element: <Navigate to="/settings/users" />,
              },
              {
                path: ':id',
                children: [
                  {
                    path: '',
                    element: <UserDetails mode="view" />,
                  },
                  {
                    path: 'edit',
                    element: <UserDetails mode="edit" />,
                  },
                ],
              },
            ],
          },
          {
            path: 'subjects',
            children: [
              {
                path: '',
                element: <SubjectsManagement />,
              },
              {
                path: 'create',
                element: <CreateSubject />,
              },
              {
                path: ':id',
                children: [
                  {
                    path: '',
                    element: <SubjectDetails mode="view" />,
                  },
                  {
                    path: 'edit',
                    element: <SubjectDetails mode="edit" />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
