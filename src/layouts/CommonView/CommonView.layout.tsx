import { Fragment, ReactNode } from 'react';
import { Box, BoxTypeMap } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';

import ViewHeaderTitle from 'shared/components/ViewHeaderTitle';
import { Centered, CenteredProps } from 'shared/components/Container';
import useCustomNavigate from 'hooks/use-custom-navigate';

interface CommonViewLayoutProps {
  headerTitle: ReactNode;
  children: ReactNode;
  maxWidth?: number;
  CenteredProps?: Partial<CenteredProps>;
}

export default function CommonViewLayout(props: CommonViewLayoutProps) {
  const { headerTitle, CenteredProps, maxWidth, children } = props;
  const { back } = useCustomNavigate();
  const actualCenteredProps: Partial<CenteredProps> = { ...CenteredProps };

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

  if (WrapperProps && actualCenteredProps?.innerSx) {
    // CenteredProps innerSx is already passed to Wrapper,
    // adding these styles to inner Container in Centered is pointless
    delete actualCenteredProps.innerSx;
  }

  return (
    <>
      <ViewHeaderTitle title={headerTitle} onBack={() => back()} />

      <Centered {...actualCenteredProps}>
        <Wrapper {...WrapperProps}>{children}</Wrapper>
      </Centered>
    </>
  );
}
