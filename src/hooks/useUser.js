import { useState, useEffect } from 'react';

const useUser = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        const persistedState = JSON.parse(localStorage.getItem('persist:root'));

        if (persistedState && persistedState.auth) {
            const authState = JSON.parse(persistedState.auth);
            setUser(authState?.user || '');
        }
    }, []);

    return user;
};

export default useUser;