import { Button, ButtonProps } from '@mui/material';

interface TextButtonProps extends ButtonProps {
  uppercase?: boolean;
}

export default function TextButton(props: TextButtonProps) {
  const { uppercase, children, sx, ...buttonProps } = props;
  return (
    <Button
      sx={{
        minWidth: 0,
        p: 0,
        ':hover': {
          backgroundColor: 'transparent',
        },
        ...(!uppercase && { textTransform: 'none' }),
        ...sx,
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
