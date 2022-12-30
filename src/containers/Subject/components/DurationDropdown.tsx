import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

import { TASK_DURATIONS } from 'shared/consts/task';
import { getReadableDuration } from 'shared/utils/date.utils';

interface DurationDropdownProps {
  disabled?: boolean;
  onSelect: (value: number) => void;
}

export default function DurationDropdown(props: DurationDropdownProps) {
  const { disabled, onSelect } = props;
  const { t } = useTranslation();
  const [menuOpened, setMenuOpened] = useState(false);
  const anchor = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setMenuOpened(true);
  };

  const handleClose = () => {
    setMenuOpened(false);
  };

  const handleSelect = (value: number) => {
    onSelect(value);
    handleClose();
  };

  return (
    <>
      <Button ref={anchor} disabled={disabled} onClick={handleClick}>
        {t('common:setDuration')}
      </Button>

      <Menu open={menuOpened} anchorEl={anchor?.current} onClose={handleClose}>
        {TASK_DURATIONS.map((duration) => (
          <MenuItem key={duration} onClick={() => handleSelect(duration)}>
            {getReadableDuration(duration, t)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
