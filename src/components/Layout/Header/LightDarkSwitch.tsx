'use client';
import {
  Switch,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { FC } from 'react';

const LightDarkSwitch: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={'var(--mantine-color-yellow-4)'}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={'var(--mantine-primary-color-filled)'}
    />
  );

  return (
    <Switch
      checked={computedColorScheme === 'dark'}
      onChange={toggleColorScheme}
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};

export default LightDarkSwitch;
