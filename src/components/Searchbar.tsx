'use client';

import { ICON_STROKE } from '@/components/Layout/Navbar/Navbar';
import { TextInput } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';

// Debounce utility function
const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Searchbar = () => {
  const t = useTranslations('component.searchbar');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debounce(() => {
        const params = new URLSearchParams(searchParams);
        if (event.target.value) {
          params.set('query', event.target.value);
        } else {
          params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
      }, 300)();
    },
    [searchParams, pathname, replace],
  );

  return (
    <TextInput
      defaultValue={searchParams.get('query')?.toString()}
      onChange={handleSearch}
      w="100%"
      leftSection={<IconListSearch stroke={ICON_STROKE} size={18} />}
      placeholder={t('placeholder')}
      radius="xl"
      size="sm"
      variant="filled"
    />
  );
};

export default Searchbar;
