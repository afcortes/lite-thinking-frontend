import { Navigate } from 'react-router';
import constants from '../constants/constants';

const TokenGuard = ({ mustBeLogged='true', children }) => {

    const user = localStorage.getItem(constants.localStorage.user);

    if (!mustBeLogged && user) return <Navigate to='/company-list' />

    if (mustBeLogged && !user) return <Navigate to='login' />;

    return <>{children}</>;
};

export default TokenGuard;