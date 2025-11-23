import { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

export const useCurrentUser = () => useContext(CurrentUserContext);
