'use client';

import { ICON_STROKE } from '@/components/Layout/Navbar/Navbar';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconListSearch, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';

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

  const [inputValue, setInputValue] = useState(
    searchParams.get('query')?.toString() ?? '',
  );

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleSearch(event);
  };

  return (
    <TextInput
      value={inputValue}
      onChange={handleChange}
      w="100%"
      leftSection={<IconListSearch stroke={ICON_STROKE} size={18} />}
      rightSection={
        <ActionIcon
          onClick={() => {
            setInputValue('');
            replace(pathname);
          }}
          radius="xl"
          variant="subtle"
          size="xs"
          disabled={!searchParams.get('query')}
        >
          <IconX stroke={ICON_STROKE} />
        </ActionIcon>
      }
      placeholder={t('placeholder')}
      radius="xl"
      size="sm"
      variant="filled"
    />
  );
};

export default Searchbar;
