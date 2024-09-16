import { FC } from 'react';
import { NavLink, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { redirect } from 'next/navigation';

export interface NavbarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ icon, label, to }) => {
  const theme = useMantineTheme();
  const matchSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <NavLink
      onClick={() => {
        redirect(to);
      }}
      variant="light"
      /* active={!!match} */
      styles={
        !matchSm
          ? {
              root: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              },
              section: {
                margin: '0px',
                marginInlineEnd: '0px',
              },
              label: {
                fontSize: 'var(--mantine-font-size-xs)',
              },
            }
          : {}
      }
      href={to}
      leftSection={icon}
      label={label}
    />
  );
};

export default NavbarItem;
