import React, { useEffect, useContext } from 'react';
import { API_URL } from "@env";
import { Text } from 'react-native';

import { Container } from '@c';
import { fetcher, AppContext } from '@u';

function SignInSreen({ route: { params }, navigation }) {
    const { setUser } = useContext(AppContext);

    const signIn = async () => {
        const { redirectScreen, ...body } = params;

        body.timestamp = Number(body.timestamp);

        const { status, error, payload } = await fetcher.post(`${API_URL}/oauth/sign-in`, body);

        if (status > 299) {
            if (status === 403) {
                // TODO replace alert to modal
                if (error.localCode === 1) {
                    alert('Время входа истекло');
                } else {
                    alert('Неправильная подпись')
                }
            } else {
                // TODO add modal error
            }

            return;
        }

        await setUser(payload);
        navigation.navigate('Profile');
    }

    useEffect(() => {
        signIn()
    }, [])

    return (
        <Container>
        </Container>
    )
}

export { SignInSreen };