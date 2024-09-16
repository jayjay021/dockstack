'use client';

import { ContainerSummary } from '@/services/docker-api';
import { ActionIcon, Badge, Box } from '@mantine/core';
import { FC, useMemo } from 'react';

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { IconListSearch, IconTerminal2, IconTrash } from '@tabler/icons-react';
import { ICON_STROKE } from '@/components/Layout/Navbar/Navbar';
import { useTranslations } from 'next-intl';

interface ContainerTableProps {
  data: ContainerSummary[];
}

const ContainerTable: FC<ContainerTableProps> = ({ data }) => {
  const t = useTranslations('pages.containers');
  const columns = useMemo<MRT_ColumnDef<ContainerSummary>[]>(
    () => [
      {
        id: 'state',
        header: t('table.header.state'),
        accessorFn(originalRow) {
          switch (originalRow.State) {
            case 'running':
              return (
                <Badge size="xs" color="green">
                  {t('table.state.running')}
                </Badge>
              );
            case 'exited':
              return <Badge color="red">{t('table.state.exited')}</Badge>;
            case 'stopped':
              return <Badge color="red">{t('table.state.stopped')}</Badge>;
            default:
              return originalRow.State;
          }
        },
        size: 50,
      },
      {
        id: 'status',
        header: t('table.header.status'),
        accessorKey: 'Status',
        size: 50,
      },

      {
        id: 'name',
        header: t('table.header.name'),
        grow: false,
        size: 200,
        accessorFn(row) {
          return row.Names?.join(', ').replace(/^\//, '');
        },
      },
      {
        id: 'image',
        header: t('table.header.image'),
        accessorKey: 'Image',
      },
      {
        id: 'id',
        header: t('table.header.id'),
        accessorKey: 'Id',
        minSize: 100,
        enableClickToCopy: true,
        grow: true,
      },
    ],
    [t],
  );

  const table = useMantineReactTable({
    columns,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: () => {
      return (
        <Box style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <ActionIcon color="blue" size="sm">
            <IconTerminal2 stroke={ICON_STROKE} size={18} />
          </ActionIcon>
          <ActionIcon color="blue" size="sm">
            <IconListSearch stroke={ICON_STROKE} size={18} />
          </ActionIcon>
          <ActionIcon color="red" size="sm">
            <IconTrash stroke={ICON_STROKE} size={18} />
          </ActionIcon>
        </Box>
      );
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: t('table.header.actions'),
        size: 54,
      },
    },
    enableGlobalFilter: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableContainerProps: {
      h: '100%',
    },
    mantinePaperProps: {
      style: { flexGrow: 1 },
    },
    renderTopToolbarCustomActions: () => {
      return <>Custom</>;
    },
    renderToolbarInternalActions: () => {
      return <></>;
    },
    layoutMode: 'grid',
    initialState: {
      density: 'xs',
    },
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MantineReactTable table={table} />;
};

export default ContainerTable;
