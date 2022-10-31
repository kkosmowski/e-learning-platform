import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import format from 'date-fns/format';

import {
  BOARD_NOTICE_CONTENT_LENGTH,
  NOTICE_CONTENT_RATIO,
  PREVIEW_NOTICE_CONTENT_LENGTH,
} from 'shared/consts/notice';
import { Notice } from 'shared/types/notice';
import { primary, unpublishedNoticeColor } from 'colors';
import { Edit, Publish } from '@mui/icons-material';
import { Role } from 'shared/types/user';
import { useAuth } from 'contexts/auth';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { useConfirmationDialog } from 'shared/hooks';
import { publishNotice } from 'api/notice';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

interface NoticeCardProps {
  notice: Notice;
  preview?: boolean;
  longerPreview?: boolean;
  boardPreview?: boolean;
  onClick?: () => void;
}

const getContentToRender = (
  content: string,
  preview?: boolean,
  longerPreview?: boolean,
  boardPreview?: boolean
): string => {
  if (!boardPreview && !longerPreview && !preview) {
    return content;
  }

  const sliceTo = boardPreview
    ? BOARD_NOTICE_CONTENT_LENGTH
    : longerPreview
    ? PREVIEW_NOTICE_CONTENT_LENGTH * NOTICE_CONTENT_RATIO
    : PREVIEW_NOTICE_CONTENT_LENGTH;
  return content.slice(0, sliceTo) + '...';
};

export default function NoticeCard(props: NoticeCardProps) {
  const { notice, preview, longerPreview, boardPreview, onClick } = props;
  const { createdBy, content, name, publishTime, isPublished } = notice;
  const { subjectId } = useParams();
  const { currentUser } = useAuth();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('notice');
  const { confirmAction, confirmationDialog } = useConfirmationDialog();
  const queryClient = useQueryClient();

  const contentToRender = getContentToRender(
    content,
    longerPreview,
    preview,
    boardPreview
  );

  const isAnyPreview = useMemo(
    () => Boolean(preview || longerPreview || boardPreview),
    [preview, longerPreview, boardPreview]
  );
  const isAuthor = useMemo(
    () => currentUser?.role === Role.Teacher && currentUser.id === createdBy.id,
    [currentUser, createdBy]
  );
  const isEditAllowed = useMemo(
    () => !isAnyPreview && isAuthor,
    [isAnyPreview, isAuthor]
  );
  const isPublishAllowed = useMemo(
    () => isEditAllowed && !isPublished,
    [isEditAllowed, isPublished]
  );

  const WrapperElement = onClick ? CardActionArea : Fragment;
  const TitleWrapper = isEditAllowed ? Box : Fragment;
  const TitleWrapperProps = isEditAllowed
    ? { sx: { display: 'flex', justifyContent: 'space-between' } }
    : {};

  const handleEdit = () => {
    navigate('./edit');
  };

  const handlePublishNow = async () => {
    const shouldPublishNow = await confirmAction({
      title: 'notice:confirm.publishNowTitle',
      message: {
        key: 'notice:confirm.publishNowMessage',
        props: { name: notice.name },
      },
      confirmLabel: 'common:publish',
    });

    if (shouldPublishNow) {
      await publishNotice(notice.id);
      await queryClient.invalidateQueries(['notices', subjectId]);
      await queryClient.refetchQueries(['notice', notice.id]);
      toast.success(t('toast.publishSuccess', { name: notice.name }));
    }
  };

  return (
    <>
      <Card
        {...(onClick && { onClick })}
        sx={{
          overflow: 'visible',
          ...(!isPublished && { backgroundColor: unpublishedNoticeColor }),
        }}
      >
        <WrapperElement
          {...(!!onClick && {
            sx: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              flex: 1,
            },
          })}
        >
          <CardContent
            component="article"
            sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
          >
            <TitleWrapper {...TitleWrapperProps}>
              <Typography component="h3" mb={1}>
                {name}
              </Typography>

              {isEditAllowed && (
                <Box>
                  {isPublishAllowed && (
                    <Tooltip title={t('tooltip.publishNow')}>
                      <IconButton onClick={handlePublishNow} size="small">
                        <Publish fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title={t('tooltip.edit')}>
                    <IconButton onClick={handleEdit} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </TitleWrapper>

            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: 15,
                whiteSpace: 'pre-wrap',
                flex: 1,
              }}
            >
              {contentToRender}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Box component="aside">
              <Typography component="span" sx={{ fontSize: 13 }}>
                {preview || longerPreview ? (
                  <strong style={{ color: primary[500] }}>
                    {createdBy.fullName}
                  </strong>
                ) : (
                  <Trans i18nKey="common:writtenBy">
                    Written by
                    <strong style={{ color: primary[500] }}>
                      {{ author: createdBy.fullName }}
                    </strong>
                  </Trans>
                )}
              </Typography>

              <Typography component="span" sx={{ mx: 1 }}>
                |
              </Typography>

              <Typography component="span" sx={{ fontSize: 13 }}>
                {preview || longerPreview ? (
                  <strong style={{ color: primary[500] }}>
                    {format(new Date(publishTime), 'dd-MM-yyyy HH:mm')}
                  </strong>
                ) : (
                  <Trans i18nKey="common:publishedOn">
                    Published on
                    <strong style={{ color: primary[500] }}>
                      {{
                        date: format(publishTime, 'dd-MM-yyyy HH:mm'),
                      }}
                    </strong>
                  </Trans>
                )}
              </Typography>
            </Box>
          </CardContent>
        </WrapperElement>
      </Card>
      {confirmationDialog}
    </>
  );
}
