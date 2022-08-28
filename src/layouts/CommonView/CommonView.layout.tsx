import { Fragment, ReactNode } from 'react';

import ViewHeader from 'layouts/Application/components/ViewHeader';
import { Centered, CenteredProps } from 'shared/components/Container';
import { Box, BoxTypeMap } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { useNavigate } from 'react-router';

interface CommonViewLayoutProps {
  headerTitle: string;
  children: ReactNode;
  maxWidth?: number;
  CenteredProps?: Partial<CenteredProps>;
}

export default function CommonViewLayout(props: CommonViewLayoutProps) {
  const { headerTitle, CenteredProps, maxWidth, children } = props;
  const navigate = useNavigate();
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

  const navigateBack = () => {
    navigate('./..');
  };

  return (
    <>
      <ViewHeader title={headerTitle} onBack={navigateBack} />

      <Centered {...actualCenteredProps}>
        <Wrapper {...WrapperProps}>{children}</Wrapper>
      </Centered>
    </>
  );
}
