import '../styles/globals.css';
import '../styles/index.scss';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '../store';
import Navbar from '../partials/Navbar';
import Layout from '../partials/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
