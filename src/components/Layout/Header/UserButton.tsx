import {
  useMantineTheme,
  UnstyledButton,
  Group,
  Text,
  Avatar as MantineAvatar,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { User } from 'lucia';
import { forwardRef } from 'react';

interface UserButtonProps {
  user: User;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ user, ...others }, ref) => {
    const theme = useMantineTheme();
    const matchSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const getInitials = (name: string) => {
      const [firstName, lastName] = name.toLocaleUpperCase().split(' ');
      return lastName ? `${firstName[0]}${lastName[0]}` : `${firstName[0]}`;
    };

    return (
      <UnstyledButton
        ref={ref}
        style={{
          color: 'var(--mantine-color-text)',
          borderRadius: 'var(--mantine-radius-sm)',
        }}
        {...others}
      >
        <Group>
          <MantineAvatar color="var(--mantine-primary-color-filled)">
            {getInitials(user.username ?? 'John Doe')}
          </MantineAvatar>
          {!matchSm && (
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user.username}
              </Text>
              <Text c="dimmed" size="xs">
                {user.id}
              </Text>
            </div>
          )}
        </Group>
      </UnstyledButton>
    );
  },
);

UserButton.displayName = 'UserButton';

export default UserButton;
