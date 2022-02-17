import * as notificationsRepository from '@r/notificationsRepository';
import { prettyPrint } from '@u';

async function getNotifications(options, jwt) {
    const response = await notificationsRepository.getNotifications(options, jwt);

    return response;
}

async function readNotification(id, jwt) {
    const response = await notificationsRepository.readNotification(id, jwt);

    return response;
}

export {
    getNotifications,
    readNotification
}