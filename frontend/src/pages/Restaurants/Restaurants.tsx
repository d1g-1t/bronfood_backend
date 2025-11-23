import { Outlet } from 'react-router-dom';
import Drawer from './Drawer/Drawer';

function Restaurants() {
    return (
        <>
            <Drawer />
            <Outlet />
        </>
    );
}

export default Restaurants;
