import { ReactNode } from 'react';
import { Box, ListItem, styled, Typography } from '@mui/material';

interface ListGridItemProps {
  label: string;
  value: ReactNode;
}

export default function ListGridItem(props: ListGridItemProps) {
  const { label, value } = props;

  return (
    <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <ListItemWrapper>
        <Typography sx={{ flex: 1 }}>{label}</Typography>
        {typeof value === 'string' ? (
          <Typography sx={{ flex: 2 }}>{value}</Typography>
        ) : (
          value
        )}
      </ListItemWrapper>
    </ListItem>
  );
}

const ListItemWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'stretch',
  columnGap: 16,
}));
