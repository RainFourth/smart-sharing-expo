import { NOTIFICATIONS_API_URL } from "@env";

import { prettyPrint, fetcher } from '@u';

async function getNotifications(options, jwt) {
    const response = await fetcher.get(`${NOTIFICATIONS_API_URL}/notifications`, {
        query: options,
        options: {
            credentials: 'same-origin',
            headers: {
                authorization: `Bearer ${jwt}`
            }
        }
    });

    return response;
}

async function readNotification(id, jwt) {
    const response = await fetcher.get(`${NOTIFICATIONS_API_URL}/notifications/${id}/readed`, {
        options: {
            credentials: 'same-origin',
            headers: {
                authorization: `Bearer ${jwt}`
            }
        }
    });

    return response
}

export {
    getNotifications,
    readNotification
}