import { useMemo, useState } from 'react';
import { AxiosError } from 'axios';

import { GetGradesResponse, GradeDto } from 'shared/types/grade';
import { getStudentGrades, getSubjectGrades, getTaskGrades } from 'api/grade';
import { useAuth } from '../../contexts/auth';
import { useQuery } from '@tanstack/react-query';
import { mapGradeDtoToGrade } from '../utils/grade.utils';

export function useGradesQuery() {
  const { currentUser } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const studentGradesQuery = useQuery<
    GetGradesResponse,
    AxiosError,
    GradeDto[]
  >(['grades', 'student', studentId], () => getStudentGrades(studentId), {
    enabled: Boolean(currentUser && studentId),
    select: ({ data }) => data,
  });

  const taskGradesQuery = useQuery<GetGradesResponse, AxiosError, GradeDto[]>(
    ['grades', 'task', taskId],
    () => getTaskGrades(taskId),
    {
      enabled: Boolean(currentUser && taskId),
      select: ({ data }) => data,
    }
  );

  const subjectGradesQuery = useQuery<
    GetGradesResponse,
    AxiosError,
    GradeDto[]
  >(['grades', 'subject', subjectId], () => getSubjectGrades(subjectId), {
    enabled: Boolean(currentUser && subjectId),
    select: ({ data }) => data,
  });

  const studentGrades = useMemo(
    () => studentGradesQuery.data?.map(mapGradeDtoToGrade),
    [studentGradesQuery.data]
  );

  const taskGrades = useMemo(
    () => taskGradesQuery.data?.map(mapGradeDtoToGrade),
    [taskGradesQuery.data]
  );

  const subjectGrades = useMemo(
    () => subjectGradesQuery.data?.map(mapGradeDtoToGrade),
    [subjectGradesQuery.data]
  );

  const isLoading = useMemo(
    () =>
      (!!studentId && studentGradesQuery.isLoading) ||
      (!!taskId && taskGradesQuery.isLoading) ||
      (!!subjectId && subjectGradesQuery.isLoading),
    [
      studentGradesQuery.isLoading,
      studentId,
      subjectGradesQuery.isLoading,
      subjectId,
      taskGradesQuery.isLoading,
      taskId,
    ]
  );

  return {
    studentGrades,
    taskGrades,
    subjectGrades,
    isLoading,
    fetchStudentGrades: setStudentId,
    fetchTaskGrades: setTaskId,
    fetchSubjectGrades: setSubjectId,
  };
}
