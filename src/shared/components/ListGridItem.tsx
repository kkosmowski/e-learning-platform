import { ReactNode } from 'react';
import { Box, ListItem, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface ListGridItemProps {
  label: string;
  value: ReactNode;
  link?: string;
}

const getValueToRender = (value: ReactNode, link?: string): ReactNode => {
  if (typeof value === 'string') {
    return link ? (
      <Typography sx={{ flex: 2 }}>
        <Link to={link}>{value}</Link>
      </Typography>
    ) : (
      <Typography sx={{ flex: 2 }}>{value}</Typography>
    );
  }
  return value;
};

export default function ListGridItem(props: ListGridItemProps) {
  const { label, value, link } = props;

  const valueToRender = getValueToRender(value, link);

  return (
    <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <ListItemWrapper>
        <Typography sx={{ flex: 1 }}>{label}</Typography>
        {valueToRender}
      </ListItemWrapper>
    </ListItem>
  );
}

const ListItemWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'stretch',
  columnGap: 16,
}));
