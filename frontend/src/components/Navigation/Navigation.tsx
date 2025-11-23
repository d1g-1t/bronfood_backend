import GuestNavigation from './GuestNavigation/GuestNavigation';
import CustomerNavigation from './CustomerNavigation/CustomerNavigation';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { FC } from 'react';
/**
 * Contains 2 menu types: guest/customer
 */
interface Navigation {
    /**
     * Click on menu item redirects to link and close menu
     */
    handleItemMenuClick: React.MouseEventHandler<HTMLElement>;
}
const Navigation: FC<Navigation> = (props) => {
    const { isLogin } = useCurrentUser();
    type UserRole = 'guest' | 'customer' | 'catering';
    const userRole: UserRole = isLogin ? 'customer' : 'guest';
    const navigation = userRole === 'guest' ? <GuestNavigation handleItemMenuClick={props.handleItemMenuClick} /> : <CustomerNavigation handleItemMenuClick={props.handleItemMenuClick} />;
    return <nav> {navigation} </nav>;
};

export default Navigation;
