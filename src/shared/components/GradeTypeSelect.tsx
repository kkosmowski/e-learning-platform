import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';
import { GradeType } from 'shared/types/grade';

interface GradeTypeSelectProps {
  value: GradeType;
  onChange: (value: GradeType) => void;
}

export default function GradeTypeSelect(props: GradeTypeSelectProps) {
  const { value, onChange } = props;
  const { t } = useTranslation('grade');

  const handleChange = (event: ChangeEvent, val: string) => {
    onChange(val as GradeType);
  };

  return (
    <FormControl>
      <FormLabel id="grade-type-label">{t('create.gradeType.label')}</FormLabel>

      <RadioGroup
        aria-labelledby="grade-type-label"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={GradeType.Assignment}
          control={<Radio />}
          label={t('create.gradeType.assignment')}
        />
        <FormControlLabel
          value={GradeType.Activity}
          control={<Radio />}
          label={t('create.gradeType.activity')}
        />
        <FormControlLabel
          value={GradeType.Behaviour}
          control={<Radio />}
          label={t('create.gradeType.behaviour')}
        />
      </RadioGroup>
    </FormControl>
  );
}
