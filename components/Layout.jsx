import React from 'react';
import dynamic from 'next/dynamic';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className='cont'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
