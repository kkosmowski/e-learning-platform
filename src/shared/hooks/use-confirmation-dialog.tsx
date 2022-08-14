import { ReactElement, useState } from 'react';
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmActionProps {
  title: string | { key: string; props: Record<string, string> };
  message: string | { key: string; props: Record<string, string> };
  confirmLabel?: string;
  confirmColor?: ButtonProps['color'];
  cancelLabel?: string;
}

export function useConfirmationDialog() {
  const [confirmationDialog, setConfirmationDialog] =
    useState<ReactElement | null>(null);
  const { t } = useTranslation();

  const confirmAction = async (data: ConfirmActionProps): Promise<boolean> => {
    const {
      title,
      message,
      confirmLabel = 'common:confirm',
      confirmColor = 'primary',
      cancelLabel = 'common:cancel',
    } = data;

    return new Promise<boolean>((resolve) => {
      const onResolve = (value: boolean) => {
        setConfirmationDialog(null);
        resolve(value);
      };

      setConfirmationDialog(
        <Dialog
          open={true}
          PaperProps={{
            sx: { maxWidth: 500 },
          }}
          onClose={() => onResolve(false)}
        >
          <DialogTitle>
            {typeof title === 'string'
              ? t(title)
              : t(title.key, { ...title.props })}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              {typeof message === 'string'
                ? t(message)
                : t(message.key, { ...message.props })}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button color="inherit" onClick={() => onResolve(false)}>
              {t(cancelLabel)}
            </Button>
            <Button
              color={confirmColor}
              variant="contained"
              onClick={() => onResolve(true)}
            >
              {t(confirmLabel)}
            </Button>
          </DialogActions>
        </Dialog>
      );
    });
  };

  return { confirmAction, confirmationDialog };
}
