'use client';

import { getDockerContainerLogs } from '@/app/(app)/containers/actions';
import { Modal, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';

interface LogDialogProps {
  id: string | null;
  opened: boolean;
  setOpen: () => void;
}

interface Log {
  type: number;
  message: string;
}

function parseLogLine(logLine: string): Log {
  // Remove the special characters and tags
  // eslint-disable-next-line no-control-regex
  const cleanedLine = logLine.replace(/[\u0000-\u0001]./g, '');

  // Extract the type based on the first character
  // eslint-disable-next-line no-control-regex
  const typeMatch = logLine.match(/[\u0001\u0002\u0000]/);
  const type = typeMatch
    ? parseInt(typeMatch[0].charCodeAt(0).toString(), 10)
    : 0;

  // Extract the message
  const message = cleanedLine.trim();
  console.log('message', message);

  return { type, message };
}

const LogDialog: FC<LogDialogProps> = ({ id, opened, setOpen }) => {
  const t = useTranslations('pages.containers.dialogs.log');
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await getDockerContainerLogs(id);
      const logLines = data.split('\n');
      const newLogs = logLines.map(parseLogLine);
      setLogs(newLogs);
      //setLogs(data);
    };
    fetchData();

    return () => {
      setLogs([]);
    };
  }, [id]);

  return (
    <Modal opened={opened} onClose={setOpen} title={t('title')} size="auto">
      {logs.map((log, index) => (
        <Text size="xs" key={index}>
          {log.message}
        </Text>
      ))}
    </Modal>
  );
};

export default LogDialog;
