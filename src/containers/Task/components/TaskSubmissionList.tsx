import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TaskSubmission } from 'shared/types/task';
import { Status } from 'shared/types/shared';
import TaskSubmissionItem from './TaskSubmissionItem';
import { isPastDate } from '../../../shared/utils/date.utils';

interface TaskSubmissionListProps {
  submissions: TaskSubmission[];
  taskEndTime: Date;
}

export default function TaskSubmissionList(props: TaskSubmissionListProps) {
  const { submissions, taskEndTime } = props;
  const { t } = useTranslation('task');

  const pastDeadline = isPastDate(taskEndTime);

  return (
    <Stack>
      {submissions.map((submission) => {
        const notSubmitted = submission.status === Status.NOT_SUBMITTED;
        return (
          <Accordion
            key={submission.id}
            disabled={notSubmitted && !pastDeadline}
          >
            <AccordionSummary>
              <Typography component="h3">
                {submission.createdBy.fullName}
                {notSubmitted && (
                  <span> ({t('submissions.notSubmittedYet')})</span>
                )}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <TaskSubmissionItem taskSubmission={submission} teacherView />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}
