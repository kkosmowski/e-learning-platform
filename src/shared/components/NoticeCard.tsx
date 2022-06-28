import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Fragment } from 'react';

import {
  BOARD_NOTICE_CONTENT_LENGTH,
  NOTICE_CONTENT_RATIO,
  PREVIEW_NOTICE_CONTENT_LENGTH,
} from 'shared/consts/notice';
import { Notice } from 'shared/types/notice';

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
    ? PREVIEW_NOTICE_CONTENT_LENGTH
    : PREVIEW_NOTICE_CONTENT_LENGTH * NOTICE_CONTENT_RATIO;
  return content.slice(0, sliceTo) + '...';
};

export default function NoticeCard(props: NoticeCardProps) {
  const {
    notice: { title, content },
    preview,
    longerPreview,
    boardPreview,
    onClick,
  } = props;

  const contentToRender = getContentToRender(
    content,
    longerPreview,
    preview,
    boardPreview
  );

  const WrapperElement = onClick ? CardActionArea : Fragment;

  return (
    <Card {...(onClick && { onClick })} sx={{ overflow: 'visible' }}>
      <WrapperElement>
        <CardContent component="article">
          <Typography component="h3" mb={1}>
            {title}
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: 15,
              whiteSpace: 'pre-wrap',
            }}
          >
            {contentToRender}
          </Typography>
        </CardContent>
      </WrapperElement>
    </Card>
  );
}
