import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';

export type ProtectedRouteProps = {
    /**
     * Potect component
     */
    component: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component }) => {
    const { isLogin } = useCurrentUser();

    return isLogin ? component : <Navigate to="/" />;
};

export default ProtectedRoute;
