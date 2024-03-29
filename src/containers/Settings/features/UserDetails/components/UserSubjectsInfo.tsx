import {
  Card,
  CardContent,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UserWithDetails } from 'shared/types/user';

interface UserSubjectsInfoProps {
  user: UserWithDetails;
}

export default function UserSubjectsInfo(props: UserSubjectsInfoProps) {
  const {
    user: { role, subjects },
  } = props;
  const { t } = useTranslation('settings');
  const navigate = useNavigate();

  if (!subjects?.length) {
    return null;
  }

  const navigateToSubject = (subjectId: string) => {
    navigate(`/settings/subjects/${subjectId}`);
  };

  return (
    <Card sx={{ gridArea: 'subjectsInfo' }}>
      <CardContent>
        <Typography sx={{ fontWeight: 600 }}>
          {t(`users.details.memberOf.${role}`)}
        </Typography>

        <List>
          {subjects.map((subject) => (
            <ListItemButton
              key={subject.id}
              onClick={() => navigateToSubject(subject.id)}
            >
              {subject.name}
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
