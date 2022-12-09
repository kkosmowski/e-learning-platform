import { ReactNode } from 'react';
import {
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogProps as MuiDialogProps,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DialogProps extends Omit<MuiDialogProps, 'title' | 'onClose'> {
  title: ReactNode;
  content: ReactNode;
  showCancel?: boolean;
  showSubmit?: boolean;
  submitLabel?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

export default function Dialog(props: DialogProps) {
  const {
    open,
    title,
    content,
    sx,
    showCancel,
    showSubmit,
    submitLabel,
    onSubmit,
    onClose,
  } = props;
  const { t } = useTranslation();

  return (
    <MuiDialog open={open} sx={sx}>
      <MuiDialogTitle>{title}</MuiDialogTitle>

      <MuiDialogContent>{content}</MuiDialogContent>

      <MuiDialogActions>
        {showCancel && <Button onClick={onClose}>{t('common:close')}</Button>}

        {showSubmit && !!submitLabel && !!onSubmit && (
          <Button onClick={() => onSubmit()}>{submitLabel}</Button>
        )}
      </MuiDialogActions>
    </MuiDialog>
  );
}
