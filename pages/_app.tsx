import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import '@/styles/globals.css';
import '@/styles/index.scss';

import { store } from '@/store';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const [Layout] = [
  dynamic(() => import("@/partials/Layout"))
]

function MyApp({ Component, pageProps }: AppProps) {
  const [dashboard, setDashboard] = useState(false);
  return (
    <Provider store={store}>
      <Layout dashboard={dashboard} setDashboard={setDashboard}>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
