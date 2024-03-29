import { ElementType, ReactNode } from 'react';
import {
  Box,
  Link as MuiLink,
  ListItem,
  styled,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface ListGridItemProps {
  label: string;
  value: ReactNode;
  link?: string;
  element?: ElementType;
}

const getValueToRender = (value: ReactNode, link?: string): ReactNode => {
  if (typeof value === 'string') {
    return link ? (
      <MuiLink component={Link} sx={{ flex: 2 }} to={link}>
        {value}
      </MuiLink>
    ) : (
      <Typography sx={{ flex: 2 }}>{value}</Typography>
    );
  }
  return value;
};

export default function ListGridItem(props: ListGridItemProps) {
  const { label, value, link, element = 'li' } = props;
  const valueToRender = getValueToRender(value, link);

  return (
    <ListItem
      component={element}
      sx={{ flexDirection: 'column', alignItems: 'stretch' }}
    >
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
