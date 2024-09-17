'use client';

import { ContainerSummary } from '@/services/docker-api';
import { ActionIcon, Badge, Box, Button, Title } from '@mantine/core';
import { FC, useMemo } from 'react';

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import {
  IconCancel,
  IconListSearch,
  IconPackage,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerStop,
  IconRestore,
  IconTerminal2,
  IconTrash,
} from '@tabler/icons-react';
import { ICON_STROKE } from '@/components/Layout/Navbar/Navbar';
import { useTranslations } from 'next-intl';

import classes from './ContainerTable.module.css';
import Searchbar from '@/components/Searchbar';

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
                <Badge size="xs" color="green" fullWidth>
                  {t('table.state.running')}
                </Badge>
              );
            case 'exited':
              return (
                <Badge size="xs" color="red" fullWidth>
                  {t('table.state.exited')}
                </Badge>
              );
            case 'stopped':
              return (
                <Badge size="xs" color="red" fullWidth>
                  {t('table.state.stopped')}
                </Badge>
              );
            default:
              return originalRow.State;
          }
        },
        minSize: 40,
        size: 40,
      },
      {
        id: 'status',
        header: t('table.header.status'),
        accessorKey: 'Status',
        size: 100,
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
        </Box>
      );
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: t('table.header.actions'),
        size: 36,
      },
    },
    enableGlobalFilter: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableRowSelection: true,
    positionToolbarAlertBanner: 'head-overlay',
    mantineTableContainerProps: {
      h: '100%',
    },
    mantinePaperProps: {
      style: { flexGrow: 1 },
    },
    renderTopToolbarCustomActions: ({ table }) => {
      const rowSelection = table.getState().rowSelection;
      const anyRowSelected = Object.keys(rowSelection).length > 0;

      return (
        <Box className={classes.toolbarCustomActionsContainer}>
          <Box className={classes.title}>
            <Box className={classes.icon}>
              <IconPackage stroke={ICON_STROKE} size={24} />
            </Box>
            <Title ml="xs" order={3}>
              {t('table.toolbar.title')}
            </Title>
          </Box>
          <Box className={classes.searchbar}>
            <Searchbar />
          </Box>
          <Box className={classes.actions}>
            <Button
              disabled={!anyRowSelected}
              color="red"
              size="xs"
              leftSection={<IconTrash stroke={ICON_STROKE} size={18} />}
            >
              {t('table.toolbar.actions.remove')}
            </Button>
            <Button
              disabled={!anyRowSelected}
              variant="outline"
              size="xs"
              leftSection={<IconPlayerPlay stroke={ICON_STROKE} size={18} />}
            >
              {t('table.toolbar.actions.resume')}
            </Button>
            <Button
              disabled={!anyRowSelected}
              variant="outline"
              size="xs"
              leftSection={<IconPlayerPause stroke={ICON_STROKE} size={18} />}
            >
              {t('table.toolbar.actions.pause')}
            </Button>
            <Button
              disabled={!anyRowSelected}
              variant="outline"
              size="xs"
              leftSection={<IconRestore stroke={ICON_STROKE} size={18} />}
            >
              {t('table.toolbar.actions.restart')}
            </Button>
            <Button
              disabled={!anyRowSelected}
              variant="outline"
              size="xs"
              leftSection={<IconCancel stroke={ICON_STROKE} size={18} />}
            >
              {t('table.toolbar.actions.kill')}
            </Button>
            <Button
              disabled={!anyRowSelected}
              variant="outline"
              size="xs"
              leftSection={<IconPlayerStop stroke={ICON_STROKE} size={18} />}
            >
              {t('table.toolbar.actions.stop')}
            </Button>
            <Button
              disabled={!anyRowSelected}
              variant="outline"
              size="xs"
              leftSection={<IconPlayerPlay stroke={ICON_STROKE} size={18} />}
            >
              {t('table.toolbar.actions.start')}
            </Button>
          </Box>
        </Box>
      );
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
