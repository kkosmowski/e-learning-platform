import { useTranslation } from 'react-i18next';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { Box, IconContainerProps, Rating } from '@mui/material';
import {
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  Star as StarIcon,
} from '@mui/icons-material';
import { TFunction } from 'i18next';
import { gradeColors } from 'colors';

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

const icons: ReactNode[] = [
  <SentimentVeryDissatisfied key="1" sx={{ color: gradeColors[0] }} />,
  <SentimentDissatisfied key="2" sx={{ color: gradeColors[1] }} />,
  <SentimentNeutral key="3" sx={{ color: gradeColors[2] }} />,
  <SentimentSatisfied key="4" sx={{ color: gradeColors[3] }} />,
  <SentimentSatisfiedAlt key="5" sx={{ color: gradeColors[4] }} />,
  <SentimentVerySatisfied key="6" sx={{ color: gradeColors[5] }} />,
];

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{icons[Math.round(value - 1)]}</span>;
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
        name="value"
        value={value}
        size="large"
        max={6}
        precision={0.5}
        IconContainerComponent={IconContainer}
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
