import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  GlobalStyles,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { MoreVert } from '@mui/icons-material';
import toast from 'react-hot-toast';

import { deleteUser, getUsers } from 'api/user';
import { Role, User } from 'shared/types/user';
import { mapUserDtoToUser } from 'shared/utils/user.utils';
import { useConfirmationDialog } from 'shared/hooks';
import { background, error } from 'colors';

export default function Users() {
  const { type } = useParams<{ type: 'teachers' | 'students' }>();
  const [users, setUsers] = useState<User[]>([]);
  const [actionMenuTarget, setActionsMenuTarget] = useState<User | null>(null);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { confirmAction, confirmationDialog } = useConfirmationDialog();

  const fetchUsers = useCallback(async () => {
    const role = getRole(type);
    const { data } = await getUsers({ role });

    setUsers(data.map(mapUserDtoToUser));
  }, [type]);

  const handleView = (userId: string) => {
    navigate(`/settings/user/${userId}`);
  };

  const handleEdit = () => {
    if (actionMenuTarget) {
      navigate(`/settings/user/${actionMenuTarget.id}/edit`);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      toast.success(t('settings:users.deleteSuccessToast'));
    } catch (e) {
      console.error(e);
    }
  };

  const showConfirmationDialog = async () => {
    if (actionMenuTarget) {
      const userToDelete = actionMenuTarget;
      setActionsMenuTarget(null);

      const shouldDelete = await confirmAction({
        title: 'settings:users.confirmDeleteTitle',
        message: {
          key: 'settings:users.confirmDeleteMessage',
          props: { name: userToDelete.fullName },
        },
        confirmLabel: 'common:delete',
        confirmColor: 'error',
      });

      if (shouldDelete) {
        await handleDelete(userToDelete.id);
        await fetchUsers();
      }
    }
  };

  useEffect(() => {
    if (type) {
      void fetchUsers();
    }
  }, [type, fetchUsers]);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableStyles />
        <UsersTableHead />
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user.id} onClick={() => handleView(user.id)}>
              <TableCell className="users-table__row--firstName">
                {user.firstName}
              </TableCell>
              <TableCell className="users-table__row--lastName">
                {user.lastName}
              </TableCell>
              <TableCell className="users-table__row--email">
                {user.email}
              </TableCell>
              <TableCell className="users-table__row--createdAt">
                {format(new Date(user.createdAt), 'dd-MM-yyyy')}
              </TableCell>
              <TableCell className="users-table__row--active">
                {user.active ? (
                  <Typography color="text.success" fontSize="inherit">
                    {t('common:active')}
                  </Typography>
                ) : (
                  <Typography color="text.error" fontSize="inherit">
                    {t('common:inactive')}
                  </Typography>
                )}
              </TableCell>
              <TableCell className="users-table__row--actions">
                <MoreButton
                  target={user}
                  currentTarget={actionMenuTarget}
                  onClick={setActionsMenuTarget}
                  onClose={() => setActionsMenuTarget(null)}
                >
                  <MenuItem onClick={handleEdit}>{t('common:edit')}</MenuItem>
                  <MenuItem
                    sx={{ color: error[600] }}
                    onClick={showConfirmationDialog}
                  >
                    {t('common:delete')}
                  </MenuItem>
                </MoreButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {confirmationDialog}
    </TableContainer>
  );
}

const getRole = (type: 'teachers' | 'students' | undefined): Role => {
  if (type === 'teachers') return Role.Teacher;
  if (type === 'students') return Role.Student;
  throw new Error("type is neither 'teachers' nor 'students'");
};

const usersTableHeadRows = [
  'common:firstName',
  'common:lastName',
  'common:email',
  'users.table.createdAt',
  'users.table.isActive',
  'users.table.actions',
];

const UsersTableHead = () => {
  const { t } = useTranslation('settings');
  return (
    <TableHead>
      <TableRow>
        {usersTableHeadRows.map((headRow) => (
          <TableCell key={headRow} className={`users-table__row--${headRow}`}>
            <Typography fontSize="inherit" color="secondary">
              {t(headRow)}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableStyles = () => (
  <GlobalStyles
    styles={{
      '.users-table__row--firstName': {
        width: '15%',
      },
      '.users-table__row--lastName': {
        width: '20%',
      },
      '.users-table__row--email': {
        width: 'calc(40% - 80px)',
      },
      '.users-table__row--createdAt': {
        width: '18%',
      },
      '.users-table__row--active': {
        width: 'max(40px, 10%)',
      },
      '.users-table__row--actions': {
        width: '40px',
      },
    }}
  />
);

interface MoreButtonProps {
  children: ReactNode;
  target: User;
  currentTarget: User | null;
  onClick: (target: User) => void;
  onClose: () => void;
}

const MoreButton = (props: MoreButtonProps) => {
  const { children, target, currentTarget, onClick, onClose } = props;
  const anchor = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <IconButton ref={anchor} onClick={() => onClick(target)}>
        <MoreVert />
      </IconButton>

      <Menu
        open={currentTarget === target}
        anchorEl={anchor.current}
        onClose={onClose}
      >
        {children}
      </Menu>
    </>
  );
};

const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: background[200],
  },
}));
