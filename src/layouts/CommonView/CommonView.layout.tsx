import { Fragment, ReactNode } from 'react';
import { Box, BoxTypeMap, Stack } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { useNavigate } from 'react-router-dom';

import ViewHeaderTitle from 'shared/components/ViewHeaderTitle';
import { Centered, CenteredProps } from 'shared/components/Container';

interface CommonViewLayoutProps {
  headerTitle?: ReactNode;
  children: ReactNode;
  maxWidth?: number;
  hideBackButton?: boolean;
  CenteredProps?: Partial<CenteredProps>;
}

export default function CommonViewLayout(props: CommonViewLayoutProps) {
  const { headerTitle, CenteredProps, maxWidth, hideBackButton, children } =
    props;
  const navigate = useNavigate();
  const actualCenteredProps: Partial<CenteredProps> = {
    sx: { overflow: 'auto', p: '16px 16px 64px', flex: 1 },
    ...CenteredProps,
  };

  const Wrapper = typeof maxWidth === 'number' ? Box : Fragment;

  const WrapperProps: DefaultComponentProps<BoxTypeMap> =
    typeof maxWidth === 'number'
      ? {
          sx: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: maxWidth,
            ...(CenteredProps?.innerSx && { ...CenteredProps.innerSx }),
          },
        }
      : {};

  return (
    <Stack sx={{ flex: 1, overflow: 'hidden' }}>
      {headerTitle && (
        <ViewHeaderTitle
          title={headerTitle}
          hideBackButton={hideBackButton}
          onBack={() => navigate(-1)}
        />
      )}

      <Centered {...actualCenteredProps}>
        <Wrapper {...WrapperProps}>{children}</Wrapper>
      </Centered>
    </Stack>
  );
}
