import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Publish, Share } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { useConfirmationDialog } from 'shared/hooks';

interface ActionToolbarProps {
  item?: [string, string];
  isPublishAllowed?: boolean;
  isEditAllowed?: boolean;
  isPreview?: boolean;
  share?: boolean;
  publish?: [string, string];
  onPublish?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionToolbar(props: ActionToolbarProps) {
  const {
    item,
    isPublishAllowed,
    isEditAllowed,
    isPreview,
    share,
    onPublish,
    onEdit,
    onDelete,
  } = props;
  const { t } = useTranslation('actions');
  const { confirmAction, confirmationDialog } = useConfirmationDialog();
  const [key, name] = item || [null, null];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      toast.success(t('common:toast.linkCopied'));
    } catch (error) {
      toast.error(t('common:toast.linkCopyFailed'));
    }
  };

  const handleDelete = async () => {
    if (!key || !name || !onDelete) return;

    const shouldDelete = await confirmAction({
      title: `${key}:confirm.deleteTitle`,
      message: {
        key: `${key}:confirm.deleteMessage`,
        props: { name },
      },
      confirmLabel: 'common:delete',
      confirmColor: 'error',
    });

    if (shouldDelete) onDelete();
  };

  const handlePublish = async () => {
    if (!key || !name || !onPublish) return;

    const shouldPublish = await confirmAction({
      title: `${key}:confirm.publishNowTitle`,
      message: {
        key: `${key}:confirm.publishNowMessage`,
        props: { name },
      },
      confirmLabel: 'common:publish',
    });

    if (shouldPublish) onPublish();
  };

  return (
    <Box>
      {isPublishAllowed && onPublish && (
        <Tooltip title={t('tooltip.publishNow')}>
          <IconButton onClick={handlePublish} size="small">
            <Publish fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {isEditAllowed && onEdit && (
        <Tooltip title={t('tooltip.edit')}>
          <IconButton onClick={onEdit} size="small">
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {!isPreview && share && (
        <Tooltip title={t('tooltip.share')}>
          <IconButton onClick={handleShare} size="small">
            <Share fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {isEditAllowed && onDelete && (
        <Tooltip title={t('tooltip.delete')}>
          <IconButton onClick={handleDelete} size="small" color="error">
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {confirmationDialog}
    </Box>
  );
}
