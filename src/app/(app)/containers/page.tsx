import { listDockerContainer } from '@/app/(app)/containers/actions';
import ContainerTable from '@/app/(app)/containers/ContainerTable';
import { Box } from '@mantine/core';

import classes from './page.module.css';

export default async function ContainersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  /*  const t = await getTranslations('pages.containers'); */
  const containers = await listDockerContainer();
  return (
    <Box className={classes.box}>
      <ContainerTable
        data={
          searchParams && searchParams.query
            ? containers.filter(
                (c) =>
                  c.Id?.match(searchParams.query!) ||
                  c.Names?.join(',').match(searchParams.query!),
              )
            : containers
        }
      />
    </Box>
  );
}
