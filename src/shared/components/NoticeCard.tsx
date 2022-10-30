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
import { Edit } from '@mui/icons-material';
import { Role } from '../types/user';
import { useAuth } from '../../contexts/auth';
import useCustomNavigate from '../../hooks/use-custom-navigate';

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
  const { currentUser } = useAuth();
  const { navigate } = useCustomNavigate();
  const { t } = useTranslation('notice');

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

  const WrapperElement = onClick ? CardActionArea : Fragment;
  const TitleWrapper = isEditAllowed ? Box : Fragment;
  const TitleWrapperProps = isEditAllowed
    ? { sx: { display: 'flex', justifyContent: 'space-between' } }
    : {};

  const handleEdit = () => {
    navigate('./edit');
  };

  return (
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
              <Tooltip title={t('edit.tooltip')}>
                <IconButton onClick={handleEdit} size="small">
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
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
  );
}
