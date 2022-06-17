import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { consts } from 'theme';

export default function Menu() {
  const items = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <List sx={{ width: consts.menuWidth }}>
      {items.map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
