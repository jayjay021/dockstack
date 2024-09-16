import { listDockerContainer } from '@/app/(app)/containers/actions';
import ContainerTable from '@/app/(app)/containers/ContainerTable';
import { Box, Title } from '@mantine/core';

import classes from './page.module.css';
import { getTranslations } from 'next-intl/server';

export default async function ContainersPage() {
  const t = await getTranslations('pages.containers');
  const containers = await listDockerContainer();
  return (
    <Box className={classes.box}>
      <Title order={1}>{t('h1')}</Title>
      <ContainerTable data={containers} />
    </Box>
  );
}
