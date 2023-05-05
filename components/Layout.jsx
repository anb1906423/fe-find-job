import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <GoogleOAuthProvider clientId="755648065622-1ojcq32mdcsls91tp86q4h6kuod74g0c.apps.googleusercontent.com">
            <div>
                <Header />
                <div className="cont">{children}</div>
                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Layout;
