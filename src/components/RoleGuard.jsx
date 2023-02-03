import { Navigate } from 'react-router';
import { useSelector } from 'react-redux'

import Spinner from './Spinner'

const RoleGuard = ({ role, children, redirect }) => {
    const { isLoading, user } = useSelector((state) => state.auth);
    
    if (isLoading) return <Spinner />;

    if (user.user.role !== role) return <Navigate to={redirect} />;

    return <>{children}</>;
};

export default RoleGuard;