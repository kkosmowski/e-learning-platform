import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { ReactNode } from 'react';

interface LabelledCheckboxProps extends CheckboxProps {
  label: ReactNode;
}

export default function LabelledCheckbox(props: LabelledCheckboxProps) {
  const { label, ...checkboxProps } = props;

  return (
    <FormControlLabel
      sx={{ alignSelf: 'flex-start' }}
      label={label}
      control={<Checkbox {...checkboxProps} />}
    />
  );
}
