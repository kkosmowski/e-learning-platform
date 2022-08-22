import { Divider, Typography } from '@mui/material';

import { background } from 'colors';
import { Centered } from 'shared/components/Container';

interface ViewHeaderProps {
  title: string;
}

export default function ViewHeader(props: ViewHeaderProps) {
  const { title } = props;

  //@todo add Back button option
  return (
    <>
      <Centered
        sx={{ flexShrink: 0, backgroundColor: background[50] }}
        innerSx={{ flexDirection: 'row' }}
      >
        <Typography component="h2" variant="h2" sx={{ color: 'inherit' }}>
          {title}
        </Typography>
      </Centered>

      <Divider />
    </>
  );
}
