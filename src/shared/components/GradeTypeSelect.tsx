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
  onChange: (event: ChangeEvent, value: GradeType) => void;
}

export default function GradeTypeSelect(props: GradeTypeSelectProps) {
  const { value, onChange } = props;
  const { t } = useTranslation('grade');

  const handleChange = (event: ChangeEvent, val: string) => {
    onChange(event, val as GradeType);
  };

  return (
    <FormControl>
      <FormLabel id="grade-type-label">{t('create.type.label')}</FormLabel>

      <RadioGroup
        aria-labelledby="grade-type-label"
        name="type"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={GradeType.ASSIGNMENT}
          control={<Radio />}
          label={t('create.type.assignment')}
        />
        <FormControlLabel
          value={GradeType.ACTIVITY}
          control={<Radio />}
          label={t('create.type.activity')}
        />
        <FormControlLabel
          value={GradeType.BEHAVIOUR}
          control={<Radio />}
          label={t('create.type.behaviour')}
        />
      </RadioGroup>
    </FormControl>
  );
}
