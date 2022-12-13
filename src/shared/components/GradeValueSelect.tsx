import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface GradeValueSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const grades = [1, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function GradValueSelect(props: GradeValueSelectProps) {
  const { value, onChange } = props;

  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={(e, val) => onChange(val)}
    >
      {grades.map((value) => (
        <GradeButton key={value} value={value}>
          {value}
        </GradeButton>
      ))}
    </ToggleButtonGroup>
  );
}

export const GradeButton = styled(ToggleButton)(() => ({
  width: 48,
  height: 48,
  font: 'inherit',
  fontSize: 16,
  fontWeight: 700,
}));
