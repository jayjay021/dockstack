'use client';
import {
  Switch,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { FC, useEffect } from 'react';

const LightDarkSwitch: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    document.body.style.background =
      colorScheme === 'dark'
        ? 'var(--mantine-color-gray-2)'
        : 'var(--mantine-color-dark-5)';
    document.body.style.color =
      colorScheme === 'dark'
        ? 'var(--mantine-color-black)'
        : 'var(--mantine-color-gray-0)';
  };

  useEffect(() => {
    document.body.style.background =
      computedColorScheme === 'dark'
        ? 'var(--mantine-color-dark-5)'
        : 'var(--mantine-color-gray-2)';
    document.body.style.color =
      computedColorScheme === 'dark'
        ? 'var(--mantine-color-gray-0)'
        : 'var(--mantine-color-black)';
  }, [computedColorScheme]);

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
