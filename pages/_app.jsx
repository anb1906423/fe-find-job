import { useEffect } from 'react';
import reduxStore, { persistor } from '../redux';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import Script from 'next/script';

import '../styles/globals.scss';
import '../styles/profile.scss';
import 'bootstrap/dist/css/bootstrap.css';
const Layout = dynamic(() => import('../components/Layout'), {
    ssr: false,
});

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <Provider store={reduxStore}>
            <Layout>
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                    crossOrigin="anonymous"
                />
                <Component {...pageProps} persistor={persistor} />
            </Layout>
        </Provider>
    ); 
}
