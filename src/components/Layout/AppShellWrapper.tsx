'use client';
import { AppShell, Container, useMantineTheme } from '@mantine/core';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import { FC } from 'react';
import { User } from 'lucia';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

interface AppShellWrapperProps {
  children: React.ReactNode;
  user: User;
}

const AppShellWrapper: FC<AppShellWrapperProps> = ({ children, user }) => {
  const [opened, { toggle }] = useDisclosure();

  const theme = useMantineTheme();
  const matchMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { md: 80 },
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding={0}
    >
      <Header opened={opened} toggle={toggle} user={user} />
      <AppShell.Main>
        <Container
          size="xl"
          p="sm"
          h={
            'calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))'
          }
          w={
            !matchMd
              ? 'calc(100vw - var(--app-shell-navbar-width, 0px)'
              : '100%'
          }
        >
          <Navbar />
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default AppShellWrapper;
