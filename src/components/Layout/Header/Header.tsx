import Avatar from '@/components/Layout/Header/Avatar';
import LightDarkSwitch from '@/components/Layout/Header/LightDarkSwitch';
import Logo from '@/components/Layout/Header/Logo';
import { AppShell, Group, Burger, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { User } from 'lucia';
import { FC } from 'react';

export interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  user: User;
}

const Header: FC<HeaderProps> = ({ opened, toggle, user }) => {
  const theme = useMantineTheme();
  const matchSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const matchMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="sm"
            hidden={!matchMd}
          />
          <Logo />
        </Group>
        <Group h="100%" justify="flex-end">
          {!matchSm && <LightDarkSwitch />}
          <Avatar user={user} />
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
