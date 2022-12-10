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
import { isPastDate } from 'shared/utils/date.utils';
import TaskSubmissionItem from './TaskSubmissionItem';
import { Check, Close } from '@mui/icons-material';

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
        const graded = submission.status === Status.GRADED;
        return (
          <Accordion
            key={submission.id}
            disabled={notSubmitted && !pastDeadline}
          >
            <AccordionSummary>
              <Typography component="h3">
                {submission.createdBy.fullName}{' '}
                {notSubmitted && (
                  <Typography
                    component="span"
                    color="text.secondary"
                    sx={sxProps.status}
                  >
                    ( <Close fontSize="small" />{' '}
                    {t('submissions.notSubmittedYet')})
                  </Typography>
                )}
                {graded && (
                  <Typography
                    component="span"
                    color="primary"
                    sx={sxProps.status}
                  >
                    ( <Check fontSize="small" /> {t('submissions.graded')})
                  </Typography>
                )}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <TaskSubmissionItem submission={submission} teacherView />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}

const sxProps = {
  status: {
    display: 'inline-flex',
    alignItems: 'center',
  },
};
