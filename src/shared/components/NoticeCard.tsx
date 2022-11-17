import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { Fragment, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

import {
  BOARD_NOTICE_CONTENT_LENGTH,
  NOTICE_CONTENT_RATIO,
  PREVIEW_NOTICE_CONTENT_LENGTH,
} from 'shared/consts/notice';
import { Notice } from 'shared/types/notice';
import { primary, unpublishedNoticeColor } from 'colors';
import { Role } from 'shared/types/user';
import { useAuth } from 'contexts/auth';
import useCustomNavigate from 'hooks/use-custom-navigate';
import { deleteNotice, publishNotice } from 'api/notice';
import ActionToolbar from './ActionToolbar';

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
  const { navigate, back } = useCustomNavigate();
  const { t } = useTranslation('notice');
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
  const isEditVisible = useMemo(
    () => !isAnyPreview && isAuthor,
    [isAnyPreview, isAuthor]
  );

  const WrapperElement = onClick ? CardActionArea : Fragment;

  const handleEdit = () => {
    navigate('./edit');
  };

  const handlePublishNow = async () => {
    await publishNotice(notice.id);
    await queryClient.invalidateQueries(['notices', subjectId]);
    await queryClient.refetchQueries(['notice', notice.id]);
    toast.success(t('toast.publishSuccess', { name: notice.name }));
  };

  const handleDelete = async () => {
    await deleteNotice(notice.id);
    await queryClient.invalidateQueries(['notices', subjectId]);
    await queryClient.removeQueries(['notice', notice.id]);
    back();
    toast.success(t('toast.deleteSuccess', { name: notice.name }));
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography component="h3" mb={1}>
                {name}
              </Typography>

              <ActionToolbar
                item={['notice', notice.name]}
                isEditVisible={isEditVisible}
                isEditAllowed={isEditAllowed}
                isDeleteAllowed={isEditAllowed}
                isPublishAllowed={isPublishAllowed}
                isPreview={isAnyPreview}
                share
                onPublish={handlePublishNow}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Box>

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
    </>
  );
}
