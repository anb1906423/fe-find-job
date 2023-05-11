import { useSelector } from 'react-redux';
import { LayOuLogin, LayOutNotLogin } from './LayOut/LayOutAuth';

const Layout = ({ children }) => {
    const isLogin = useSelector((state) => state.user.isLoggedIn);

    return <>{isLogin ? <LayOuLogin children={children} /> : <LayOutNotLogin children={children} />}</>;
};

export default Layout;
