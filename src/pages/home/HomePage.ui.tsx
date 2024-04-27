import type { FC, ReactElement } from 'react';

import { Users } from '@/widgets/Users';

export const HomePage: FC = (): ReactElement => {
  return (
    <main style={{ padding: '30px 0' }}>
      <Users />
    </main>
  );
};
