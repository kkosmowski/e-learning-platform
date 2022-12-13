import { ReactElement, ReactNode, useState } from 'react';
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

type TranslatableObject = { key: string; props: Record<string, string> };

interface ConfirmActionProps {
  title: string | TranslatableObject;
  message: string | TranslatableObject | ReactNode;
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

      const messageJsx =
        typeof message === 'string'
          ? t(message)
          : (message as TranslatableObject).key
          ? t((message as TranslatableObject).key, {
              ...(message as TranslatableObject).props,
            })
          : message;

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
            <DialogContentText>{messageJsx}</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button color="inherit" onClick={() => onResolve(false)}>
              {t(cancelLabel)}
            </Button>

            <Button
              variant="contained"
              color={confirmColor}
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
