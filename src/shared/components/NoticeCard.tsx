import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { Trans } from 'react-i18next';
import format from 'date-fns/format';

import {
  BOARD_NOTICE_CONTENT_LENGTH,
  NOTICE_CONTENT_RATIO,
  PREVIEW_NOTICE_CONTENT_LENGTH,
} from 'shared/consts/notice';
import { Notice } from 'shared/types/notice';
import { primary } from 'colors';

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
  const { content, name, publishTime } = notice;

  const contentToRender = getContentToRender(
    content,
    longerPreview,
    preview,
    boardPreview
  );

  const WrapperElement = onClick ? CardActionArea : Fragment;
  console.log({ publishTime });

  return (
    <Card {...(onClick && { onClick })} sx={{ overflow: 'visible' }}>
      <WrapperElement
        {...(!!onClick && {
          sx: { display: 'flex', flexDirection: 'column', flex: 1 },
        })}
      >
        <CardContent
          component="article"
          sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          <Typography component="h3" mb={1}>
            {name}
          </Typography>

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
                  {/*{ author.fullName }*/}
                </strong>
              ) : (
                <Trans i18nKey="common:writtenBy">
                  Written by
                  <strong style={{ color: primary[500] }}>
                    {/*{{ author: author.fullName }}*/}
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
