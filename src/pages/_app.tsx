import { DashboardShell } from '@/shells/DashboardShell';
import '@/styles/globals.css';
import {
  MantineProvider
} from '@mantine/core';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
=======
>>>>>>> Stashed changes
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function DefaultLayout (page: ReactNode): ReactNode {
  return <DashboardShell>{page}</DashboardShell>;
}

export default function App ({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component?.getLayout ?? ((page) => DefaultLayout(page));

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        colors: {
          'brand': ['#56a8f0']
<<<<<<< Updated upstream
        },
=======
        }
>>>>>>> Stashed changes
      }}
    >
      <main>{getLayout(<Component {...pageProps} />)}</main>
    </MantineProvider>
  )
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}
