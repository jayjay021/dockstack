'use client';
import { Menu, rem } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import UserButton from './UserButton';
import { User } from 'lucia';
import { logout } from '@/server/actions/auth.actions';

interface AvatarProps {
  user: User;
}

const Avatar: FC<AvatarProps> = ({ user }) => {
  const t = useTranslations('header.avatar');
  return (
    <Menu shadow="md" width={200} withArrow>
      <Menu.Target>
        <UserButton user={user} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          {t('menu.settings')}
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => logout()}
        >
          {t('menu.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Avatar;
