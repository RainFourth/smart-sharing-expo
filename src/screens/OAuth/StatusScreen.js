import React, { useState, useEffect } from "react";

import { Container } from '@c';

function StatusScreen({ route: { params }, navigation }) {
    const [iconName, setIconName] = useState("refresh");
    const [statusCode, setStatusCode] = useState(null);
    const [message, setMessage] = useState(null);
    const [pageStatus, setPageStatus] = useState("wait");

    useEffect(() => {
        const {
            status,
            status_code,
            message: message_,
            ...rest
        } = params;

        setStatusCode(Number(status_code));
        setMessage(decodeURIComponent(message_));

        if (status === "error") {
            setIconName("close");
            setPageStatus("error");
            alert(`${status_code} ${message_}`)
        } else {
            let screen;

            switch (status) {
                case "signIn": screen = "OAuthSignInScreen"; break;
                case "signUp": screen = "OAuthSignUpScreen"; break;
                case "attach": screen = "OAuthAttachScreen";
            }

            navigation.navigate(screen, rest);
        }
    }, []);

    return (
        <Container>
        </Container>
    );
}

export { StatusScreen };