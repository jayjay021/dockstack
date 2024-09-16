import NavbarItem, {
  NavbarItemProps,
} from '@/components/Layout/Navbar/NavbarItems';
import { AppShell } from '@mantine/core';
import { useTranslations } from 'next-intl';
import {
  IconChartDonut,
  IconFiles,
  IconHierarchy2,
  IconMessages,
  IconSettings,
} from '@tabler/icons-react';
import { FC } from 'react';

const ICON_STROKE = 1.2;

const Navbar: FC = () => {
  const t = useTranslations('nav');

  const sideBarItems: NavbarItemProps[] = [
    {
      to: 'dashboard',
      label: t('nav.dashboard'),
      icon: <IconMessages stroke={ICON_STROKE} />,
    },
    {
      to: 'containers',
      label: t('nav.container'),
      icon: <IconFiles stroke={ICON_STROKE} />,
    },
    {
      to: 'stacks',
      label: t('nav.stacks'),
      icon: <IconHierarchy2 stroke={ICON_STROKE} />,
    },
    {
      to: 'volumes',
      label: t('nav.volumes'),
      icon: <IconChartDonut stroke={ICON_STROKE} />,
    },
    {
      to: 'networks',
      label: t('nav.networks'),
      icon: <IconSettings stroke={ICON_STROKE} />,
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
