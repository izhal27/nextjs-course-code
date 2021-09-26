import { Fragment } from 'react';
import Head from 'next/head';

import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Fragment>
        <Head>
          <title>NextJS Events</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Find an events" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </NotificationContextProvider>
  );
}

export default MyApp;
