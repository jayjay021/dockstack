// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'; //import Mantine V7 styles needed by MRT
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //import MRT styles
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';
import './globals.css';

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { NextIntlClientProvider } from 'next-intl';
import { ModalsProvider } from '@mantine/modals';
import { ToastContainer } from 'react-toastify';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata = {
  title: 'Dockstack',
  description: 'Dockstack is a platform for managing Docker containers.',
};

const theme = createTheme({
  cursorType: 'pointer',
  primaryColor: 'blue',
  colors: {
    'technikbot-blue': [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],
  },
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <ModalsProvider>
              <ToastContainer
                hideProgressBar
                position="bottom-right"
                toastClassName={'toast'}
                autoClose={3000}
              />
              {children}
            </ModalsProvider>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
