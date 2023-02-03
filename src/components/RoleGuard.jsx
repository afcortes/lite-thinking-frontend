import { useSelector } from 'react-redux'

import Spinner from './Spinner'

const RoleGuard = ({ role, children }) => {
    const { isLoading, user } = useSelector((state) => state.auth);
    
    if (isLoading) return <Spinner />;

    if (!user || user.user.role !== role) return <></>;

    return <>{children}</>;
};

export default RoleGuard;