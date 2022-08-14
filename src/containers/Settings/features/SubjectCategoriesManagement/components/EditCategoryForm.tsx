import { Box, Button, TextField, Tooltip } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface EditCategoryFormProps {
  value: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export default function EditCategoryForm(props: EditCategoryFormProps) {
  const { value, onSubmit, onCancel } = props;
  const [categoryName, setCategoryName] = useState(value);
  const { t } = useTranslation('settings');

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(categoryName);
    onCancel();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        value={categoryName}
        placeholder={t('subjectCategories.categoryNamePlaceholder')}
        autoFocus
        sx={{ mr: 'auto' }}
        inputProps={{
          sx: {
            py: '6px',
          },
        }}
        size="small"
        onChange={handleCategoryNameChange}
      />

      <Tooltip
        title={
          !categoryName
            ? t('subjectCategories.nameCannotBeEmptyTooltip')
            : categoryName === value
            ? t('subjectCategories.nothingToSaveTooltip')
            : ''
        }
      >
        <span>
          <Button
            variant="contained"
            disabled={!categoryName || categoryName === value}
            sx={{ py: '5.25px' }}
            onClick={handleSubmit}
          >
            {t('common:save')}
          </Button>
        </span>
      </Tooltip>

      <Button color="secondary" sx={{ py: '5.25px' }} onClick={onCancel}>
        {t('common:cancel')}
      </Button>
    </Box>
  );
}
