import {
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useMemo,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { MoreVert } from '@mui/icons-material';
import {
  GlobalStyles,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';

import { background, error } from 'colors';
import { User } from 'shared/types/user';
import usePrevious from 'hooks/use-previous';

interface UsersTableProps {
  users: User[];
  target: User | null;
  setTarget: Dispatch<SetStateAction<User | null>>;
  onView: (userId: string) => void;
  onEdit: () => void;
  showStatusToggleDialog: () => void;
  showDeleteDialog: () => void;
}

const usersTableHeadRows = [
  'common:firstName',
  'common:lastName',
  'common:email',
  'users.table.createdAt',
  'users.table.isActive',
  'users.table.actions',
];

export default function UsersTable(props: UsersTableProps) {
  const {
    users,
    onView,
    target,
    setTarget,
    onEdit,
    showStatusToggleDialog,
    showDeleteDialog,
  } = props;
  const { t } = useTranslation();

  const previousTarget = usePrevious(target);
  const anyTarget = useMemo(
    () => target || previousTarget,
    [target, previousTarget]
  );

  const handleShowStatusToggleDialog = (event: MouseEvent) => {
    event.stopPropagation();
    showStatusToggleDialog();
  };

  const handleShowDeleteDialog = (event: MouseEvent) => {
    event.stopPropagation();
    showDeleteDialog();
  };

  const handleView = (event: MouseEvent, userId: string) => {
    event.stopPropagation();
    onView(userId);
  };

  const handleEdit = (event: MouseEvent) => {
    event.stopPropagation();
    onEdit();
  };

  return (
    <Table size="small">
      <TableStyles />
      <UsersTableHead />
      <TableBody>
        {users.map((user) => (
          <StyledTableRow
            key={user.id}
            onClick={(event) => handleView(event, user.id)}
          >
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
                currentTarget={target}
                onClick={setTarget}
                onClose={() => setTarget(null)}
              >
                <MenuItem onClick={handleEdit}>{t('common:edit')}</MenuItem>
                <MenuItem
                  {...(anyTarget?.active && {
                    sx: { color: error[600] },
                  })}
                  onClick={handleShowStatusToggleDialog}
                >
                  {anyTarget?.active
                    ? t('common:deactivate')
                    : t('common:activate')}
                </MenuItem>
                <MenuItem
                  sx={{ color: error[600] }}
                  onClick={handleShowDeleteDialog}
                >
                  {t('common:delete')}
                </MenuItem>
              </MoreButton>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick(target);
  };

  const handleClose = (event: MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <>
      <IconButton ref={anchor} onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu
        open={currentTarget === target}
        anchorEl={anchor.current}
        onClose={handleClose}
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
