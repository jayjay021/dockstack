import AppShellWrapper from '@/components/Layout/AppShellWrapper';
import { validateRequest } from '@/lib/lucia';

import { redirect } from 'next/navigation';

async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) {
    redirect('/login');
  }

  return <AppShellWrapper user={user}>{children}</AppShellWrapper>;
}

export default AppLayout;
