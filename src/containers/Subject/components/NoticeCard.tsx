import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Fragment } from 'react';

import {
  NOTICE_CONTENT_RATIO,
  PREVIEW_NOTICE_CONTENT_LENGTH,
} from 'shared/consts/notice';
import { Notice } from 'shared/types/notice';

interface NoticeCardProps {
  notice: Notice;
  preview?: boolean;
  longerPreview?: boolean;
  onClick?: () => void;
}

const getContentToRender = (
  content: string,
  longerPreview?: boolean,
  preview?: boolean
): string => {
  if (!longerPreview && !preview) {
    return content;
  }

  const sliceTo = longerPreview
    ? PREVIEW_NOTICE_CONTENT_LENGTH
    : PREVIEW_NOTICE_CONTENT_LENGTH * NOTICE_CONTENT_RATIO;
  return content.slice(0, sliceTo) + '...';
};

export default function NoticeCard(props: NoticeCardProps) {
  const {
    notice: { title, content },
    preview,
    longerPreview,
    onClick,
  } = props;

  const contentToRender = getContentToRender(content, longerPreview, preview);

  const WrapperElement = onClick ? CardActionArea : Fragment;

  return (
    <Card {...(onClick && { onClick })}>
      <WrapperElement>
        <CardContent>
          <Typography component="h2">{title}</Typography>

          <Typography color="text.secondary">{contentToRender}</Typography>
        </CardContent>
      </WrapperElement>
    </Card>
  );
}
