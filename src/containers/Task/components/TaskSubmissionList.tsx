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

interface TaskSubmissionListProps {
  submissions: TaskSubmission[];
}

export default function TaskSubmissionList(props: TaskSubmissionListProps) {
  const { submissions } = props;
  const { t } = useTranslation('task');

  return (
    <Stack>
      {submissions.map((submission) => {
        const notSubmitted = submission.status === Status.NOT_SUBMITTED;
        return (
          <Accordion key={submission.id} disabled={notSubmitted}>
            <AccordionSummary>
              <Typography component="h3">
                {submission.createdBy.fullName}
                {notSubmitted && (
                  <span> ({t('submissions.notSubmittedYet')})</span>
                )}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <TaskSubmissionItem taskSubmission={submission} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}
