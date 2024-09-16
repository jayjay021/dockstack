'use client';
import { signup } from '@/app/(auth)/signup/action';
import { signupFormSchema } from '@/app/(auth)/signup/schema';
import {
  Center,
  Card,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';

const SignupForm = () => {
  const t = useTranslations('auth.signup');
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', password: '', passwordConfirmation: '' },

    // functions will be used to validate values at corresponding key
    validate: zodResolver(signupFormSchema),
  });

  const handleSubmit = async ({
    name,
    password,
    passwordConfirmation,
  }: {
    name: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    await signup(name, password, passwordConfirmation);
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
          <PasswordInput
            required
            mt="sm"
            label={t('passwordConfirmation')}
            placeholder={t('passwordConfirmation')}
            key={form.key('passwordConfirmation')}
            {...form.getInputProps('passwordConfirmation')}
          />
          <Button type="submit" mt="sm" fullWidth>
            {t('action')}
          </Button>
        </form>
      </Card>
    </Center>
  );
};

export default SignupForm;
