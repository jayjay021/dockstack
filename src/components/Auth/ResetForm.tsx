'use client';

import { reset } from '@/app/(auth)/reset/actions';
import { Center, Card, Title, Text, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const ResetForm = () => {
  const t = useTranslations('auth.reset');
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { resetkey: '' },
  });

  const handleSubmit = async ({ resetkey }: { resetkey: string }) => {
    const res = await reset(resetkey);
    console.log(res);
  };
  return (
    <Center>
      <Card>
        <Title mb={10} order={1}>
          {t('h1')}
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label={t('resetkey')}
            placeholder={t('resetkey')}
            key={form.key('resetkey')}
            {...form.getInputProps('resetkey')}
          />
          <Button type="submit" mt="sm" fullWidth>
            {t('action')}
          </Button>
        </form>
        <span>
          <Text size="sm" mt={10}>
            {t('secondary')} <Link href="/signin">{t('secondary-link')}</Link>
          </Text>
        </span>
      </Card>
    </Center>
  );
};

export default ResetForm;
