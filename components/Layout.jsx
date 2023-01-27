import React from 'react';
import dynamic from 'next/dynamic';

import Footer from './Footer';

const Header = dynamic(() => import('./Header'), {
    ssr: false,
});

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
