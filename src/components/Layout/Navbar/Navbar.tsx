import NavbarItem, {
  NavbarItemProps,
} from '@/components/Layout/Navbar/NavbarItems';
import { AppShell } from '@mantine/core';
import { useTranslations } from 'next-intl';
import {
  IconFileSettings,
  IconPackages,
  IconPackage,
  IconStack3,
  IconDashboard,
  IconTemplate,
  IconCloudComputing,
  IconDatabase,
  IconKey,
} from '@tabler/icons-react';
import { FC } from 'react';

export const ICON_STROKE = 1.2;

const Navbar: FC = () => {
  const t = useTranslations('nav');

  const sideBarItems: NavbarItemProps[] = [
    {
      to: 'dashboard',
      label: t('nav.dashboard'),
      icon: <IconDashboard stroke={ICON_STROKE} />,
    },
    {
      to: 'app-templates',
      label: t('nav.appTemplates'),
      icon: <IconTemplate stroke={ICON_STROKE} />,
    },
    {
      to: 'stacks',
      label: t('nav.stacks'),
      icon: <IconStack3 stroke={ICON_STROKE} />,
    },
    {
      to: 'containers',
      label: t('nav.container'),
      icon: <IconPackage stroke={ICON_STROKE} />,
    },
    {
      to: 'images',
      label: t('nav.images'),
      icon: <IconPackages stroke={ICON_STROKE} />,
    },

    {
      to: 'networks',
      label: t('nav.networks'),
      icon: <IconCloudComputing stroke={ICON_STROKE} />,
    },
    {
      to: 'volumes',
      label: t('nav.volumes'),
      icon: <IconDatabase stroke={ICON_STROKE} />,
    },

    {
      to: 'configs',
      label: t('nav.configs'),
      icon: <IconFileSettings stroke={ICON_STROKE} />,
    },
    {
      to: 'secrets',
      label: t('nav.secrets'),
      icon: <IconKey stroke={ICON_STROKE} />,
    },
  ];

  return (
    <AppShell.Navbar p="0">
      {sideBarItems.map((item) => (
        <NavbarItem key={item.to} {...item} />
      ))}
    </AppShell.Navbar>
  );
};

export default Navbar;
