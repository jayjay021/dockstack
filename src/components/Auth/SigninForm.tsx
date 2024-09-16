'use client';
import { login } from '@/app/(auth)/login/actions';
import { signinFormSchema } from '@/app/(auth)/login/schema';
import {
  Center,
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const SigninForm = () => {
  const t = useTranslations('auth.signin');
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', password: '' },
    validate: zodResolver(signinFormSchema),
  });

  const handleSubmit = async ({
    name,
    password,
  }: {
    name: string;
    password: string;
  }) => {
    const res = await login(name, password);
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
            label={t('name')}
            placeholder={t('name')}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <PasswordInput
            required
            mt="sm"
            label={t('password')}
            placeholder={t('password')}
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button type="submit" mt="sm" fullWidth>
            {t('action')}
          </Button>
        </form>
        <span>
          <Text size="sm" mt={10}>
            {t('secondary')} <Link href="/reset">{t('secondary-link')}</Link>
          </Text>
        </span>
      </Card>
    </Center>
  );
};

export default SigninForm;
