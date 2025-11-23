import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/restaurants');
    }, [navigate]);

    return <></>;
};

export default Main;
