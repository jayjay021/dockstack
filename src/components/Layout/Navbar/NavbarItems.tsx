import { FC } from 'react';
import { NavLink } from '@mantine/core';

import classes from './NavbarItems.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavbarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ icon, label, to }) => {
  const path = usePathname();

  return (
    <NavLink
      component={Link}
      variant="light"
      classNames={{
        root: classes.root,
        label: classes.label,
        section: classes.section,
      }}
      active={path === `/${to}`}
      href={to}
      leftSection={icon}
      label={label}
    />
  );
};

export default NavbarItem;
