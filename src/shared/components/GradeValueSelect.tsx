import { useTranslation } from 'react-i18next';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Rating } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { TFunction } from 'i18next';

interface GradeValueSelectProps {
  value: number;
  onChange: (value: number) => void;
}

function getLabelText(value: number, t: TFunction) {
  if (!value) return '';
  return t(
    `value.${value % 1 ? String(value).replace('.', ',') : String(value)}`
  );
}

function fixLowValue(value: number) {
  return value > -1 && value < 2 ? 1 : value;
}

export default function GradValueSelect(props: GradeValueSelectProps) {
  const { value, onChange } = props;
  const [hover, setHover] = useState(-1);
  const { t } = useTranslation('grade');

  const handleChange = (event: SyntheticEvent, newValue: number | null) => {
    if (newValue) onChange(fixLowValue(newValue));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        size="large"
        max={6}
        precision={0.5}
        getLabelText={(value) => getLabelText(value, t)}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

      <Box sx={{ ml: 2 }}>{getLabelText(hover !== -1 ? hover : value, t)}</Box>
    </Box>
  );
}
