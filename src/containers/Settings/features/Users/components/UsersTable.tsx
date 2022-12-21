import {
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { format } from 'date-fns';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import colors, { error } from 'colors';
import { User } from 'shared/types/user';
import usePrevious from 'hooks/use-previous';

interface UsersTableProps {
  users: User[];
  target: User | null;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  fetchNextPage: () => void;
  setTarget: Dispatch<SetStateAction<User | null>>;
  onView: (userId: string) => void;
  onEdit: () => void;
  showStatusToggleDialog: () => void;
  showDeleteDialog: () => void;
}

export default function UsersTable(props: UsersTableProps) {
  const {
    users,
    onView,
    target,
    hasNextPage,
    isFetching,
    fetchNextPage,
    setTarget,
    onEdit,
    showStatusToggleDialog,
    showDeleteDialog,
  } = props;
  const { t } = useTranslation('settings');
  const dataGridRef = useRef<HTMLDivElement | null>(null);

  const previousTarget = usePrevious(target);
  const anyTarget = useMemo(
    () => target || previousTarget,
    [target, previousTarget]
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!dataGridRef.current) {
        return;
      }

      const scrollContainer = dataGridRef.current?.querySelector(
        '.MuiDataGrid-virtualScroller'
      );

      if (!scrollContainer) {
        return;
      }

      const observer = new IntersectionObserver(
        async ([entry]) => {
          console.log(entry);
          if (entry?.isIntersecting && !isFetching && hasNextPage) {
            await fetchNextPage();
          }
        },
        {
          root: scrollContainer,
          threshold: 0.9,
        }
      );

      const lastRow = dataGridRef.current?.querySelector(
        '.MuiDataGrid-row:last-child'
      );

      if (lastRow) {
        observer.observe(lastRow);
      }
      return () => {
        observer.disconnect();
      };
    });
  }, [isFetching, hasNextPage, fetchNextPage]);

  const handleShowStatusToggleDialog = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      showStatusToggleDialog();
    },
    [showStatusToggleDialog]
  );

  const handleShowDeleteDialog = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      showDeleteDialog();
    },
    [showDeleteDialog]
  );

  const handleView = ({ id }: GridRowParams, event: MouseEvent) => {
    event.stopPropagation();
    onView(String(id));
  };

  const handleEdit = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onEdit();
    },
    [onEdit]
  );

  const rows = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        createdAt: format(new Date(user.createdAt), 'dd-MM-yyyy'),
        isActive: user.active,
        actions: user,
      })),
    [users]
  );

  const renderActions = useCallback(
    (user: User) => (
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
          {anyTarget?.active ? t('common:deactivate') : t('common:activate')}
        </MenuItem>
        {/*<MenuItem sx={{ color: error[600] }} onClick={handleShowDeleteDialog}>*/}
        {/*  {t('common:delete')}*/}
        {/*</MenuItem>*/}
      </MoreButton>
    ),
    [
      anyTarget?.active,
      handleEdit,
      handleShowDeleteDialog,
      handleShowStatusToggleDialog,
      setTarget,
      t,
      target,
    ]
  );

  const renderIsActive = useCallback(
    (isActive: boolean) =>
      isActive ? (
        <Typography color="text.success" fontSize="inherit">
          {t('common:active')}
        </Typography>
      ) : (
        <Typography color="text.error" fontSize="inherit">
          {t('common:inactive')}
        </Typography>
      ),
    [t]
  );

  const getColumns = useCallback(
    (t: TFunction): GridColDef[] => [
      { field: 'firstName', headerName: t('common:firstName'), flex: 18 },
      { field: 'lastName', headerName: t('common:lastName'), flex: 22 },
      { field: 'email', headerName: t('common:email'), flex: 30 },
      {
        field: 'createdAt',
        headerName: t('users.table.createdAt'),
        width: 140,
      },
      {
        field: 'isActive',
        headerName: t('users.table.isActive'),
        width: 90,
        renderCell: (params) => renderIsActive(params.value),
      },
      {
        field: 'actions',
        headerName: t('users.table.actions'),
        width: 70,
        renderCell: (params) => renderActions(params.value),
      },
    ],
    [renderActions, renderIsActive]
  );

  const columns = useMemo(() => getColumns(t), [getColumns, t]);

  return (
    <DataGrid
      ref={dataGridRef}
      hideFooter
      columns={columns}
      rows={rows}
      sx={{ color: colors.text.primary, flex: 1 }}
      onRowClick={handleView}
    />
  );
}

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
