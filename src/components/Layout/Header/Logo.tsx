import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const Logo: FC = () => {
  const t = useTranslations('header');
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{
        from: 'var(--mantine-primary-color-2)',
        to: 'var(--mantine-primary-color-9)',
        deg: 45,
      }}
    >
      {t('title')}
    </Text>
  );
};

export default Logo;
