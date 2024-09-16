'use client';
import { AppShell, Container } from '@mantine/core';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import { FC } from 'react';
import { User } from 'lucia';
import { useDisclosure } from '@mantine/hooks';

import classes from './AppShellWrapper.module.css';

interface AppShellWrapperProps {
  children: React.ReactNode;
  user: User;
}

const AppShellWrapper: FC<AppShellWrapperProps> = ({ children, user }) => {
  const [opened, { toggle }] = useDisclosure();

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
        <Container p="sm" size="xl" className={classes.container}>
          <Navbar />
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default AppShellWrapper;
