import HomeSidenav from 'containers/HomeSidenav';
import { Centered } from 'shared/components/Container';
import { LayoutFix } from 'layouts/LayoutFix';

export default function Home() {
  return (
    <LayoutFix>
      <HomeSidenav />

      <Centered>Siemanko w HOME</Centered>
    </LayoutFix>
  );
}
