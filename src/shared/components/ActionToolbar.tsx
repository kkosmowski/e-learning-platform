import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, DoneAll, Edit, Publish, Share } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { useConfirmationDialog } from 'shared/hooks';

interface ActionToolbarProps {
  item?: [string, string];
  isPublishAllowed?: boolean;
  isEditVisible?: boolean;
  isEditAllowed?: boolean;
  isDeleteAllowed?: boolean;
  isPreview?: boolean;
  finishNow?: boolean;
  share?: boolean;
  publish?: [string, string];
  onPublish?: () => void;
  onFinishNow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionToolbar(props: ActionToolbarProps) {
  const {
    item,
    isPublishAllowed,
    isEditVisible,
    isEditAllowed,
    isDeleteAllowed,
    isPreview,
    finishNow,
    share,
    onPublish,
    onFinishNow,
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

  const handleFinishNow = async () => {
    if (!key || !name || !onFinishNow) return;

    const shouldFinish = await confirmAction({
      title: `${key}:confirm.finishNowTitle`,
      message: {
        key: `${key}:confirm.finishNowMessage`,
        props: { name },
      },
      confirmLabel: 'common:finish',
    });

    if (shouldFinish) onFinishNow();
  };

  return (
    <Box sx={{ flexShrink: 0 }}>
      {isPublishAllowed && onPublish && (
        <Tooltip title={t('tooltip.publishNow')}>
          <IconButton onClick={handlePublish} size="small">
            <Publish fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {isEditVisible && finishNow && onFinishNow && (
        <Tooltip title={t('tooltip.finishNow')}>
          <span>
            <IconButton
              onClick={handleFinishNow}
              disabled={!isEditAllowed}
              size="small"
              color="primary"
            >
              <DoneAll fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {isEditVisible && onEdit && (
        <Tooltip
          title={isEditAllowed ? t('tooltip.edit') : t('tooltip.editDisabled')}
        >
          <span>
            <IconButton onClick={onEdit} disabled={!isEditAllowed} size="small">
              <Edit fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {!isPreview && share && (
        <Tooltip title={t('tooltip.share')}>
          <IconButton onClick={handleShare} size="small">
            <Share fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {isEditVisible && onDelete && (
        <Tooltip
          title={
            !isEditAllowed || !isDeleteAllowed
              ? t('tooltip.deleteDisabled')
              : t('tooltip.delete')
          }
        >
          <span>
            <IconButton
              onClick={handleDelete}
              disabled={!isEditAllowed || !isDeleteAllowed}
              size="small"
              color="error"
            >
              <Delete fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {confirmationDialog}
    </Box>
  );
}
