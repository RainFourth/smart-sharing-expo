import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { API_URL } from "@env";

import { fetcher } from '@u';

function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        const userStorage = await AsyncStorage.getItem('user');

        if (userStorage) {
            setUser(JSON.parse(userStorage));
            setLoading(false);
            return;
        }

        // TODO
        const { error, status, payload } = await fetcher.get(`${API_URL}/users/current?represent=session`);

        if (status === 200) {
            await AsyncStorage.setItem('user', JSON.stringify(payload));
            setUser(payload);
        } else if (status !== 403) {
            // TODO replace alert
            alert(error);
        }

        setLoading(false);
    }

    const setUser_ = async (user) => {
        if (user === null) {
            await AsyncStorage.removeItem('user');
        } else {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        }

        setUser(user);
    }

    useEffect(() => {
        load();
    }, []);

    return [loading, user, setUser_];
}

export { useUser };