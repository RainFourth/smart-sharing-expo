import {useEffect, useState} from "react";
import {useAuth} from "@h/useAuth";
import io, {Socket} from "socket.io-client";
import {NOTIFICATIONS_API_URL, NOTIFICATIONS_SOCKET_NAMESPACE, NOTIFICATIONS_SOCKET_PATH} from "@env";
import {Vibration} from "react-native";
import {prettyPrint} from "@u";
import {NotificationObjType} from "~/notificationObjType";

export const useSocket = () => {
    const [socket, setSocket] = useState(null as Socket|null)
    const [notification, setNotification] = useState({} as NotificationObjType);
    const [notificationVisible, setNotificationVisible] = useState(false)
    const { jwt, updateJwt } = useAuth()

    useEffect(()=>{
        closeConnection()
        if (jwt) newConnection(jwt)
    },[jwt])

    const closeConnection = () => {
        if (socket){
            socket.disconnect()
            setSocket(null)
        }
    }

    // todo а можно ли тот же сокет переконнектить и не пересоздавать весь сокет
    const newConnection = (jwt: string) => {
        const socket = io(`${NOTIFICATIONS_API_URL}${NOTIFICATIONS_SOCKET_NAMESPACE}`, {
            path: `${NOTIFICATIONS_SOCKET_PATH}/socket.io`,
            extraHeaders: {
                authorization: `Bearer ${jwt}`
            }
        });

        socket.on("connect", () => console.info("Sockets connected"));
        socket.on("disconnect", () => console.log("Sockets disconnected"));

        socket.on("connect_error", err => {
            if (err.message === "JWT_EXPIRED") {
                updateJwt();
            }
        });

        socket.on("updateJwt", () => updateJwt());

        socket.on("notification",
            // ({ module: modulee, action, title, description, type, extra, save })
            (notification) => {
                prettyPrint(notification);
                Vibration.vibrate(200);

                if (notification.save) {
                    // @ts-ignore
                    dispatch({
                        type: 'addNotification',
                        payload: notification
                    })
                }

                setNotification(notification);
                setNotificationVisible(true);
            });

        setSocket(socket);
    }


    return [notification, notificationVisible, setNotificationVisible] as
        [NotificationObjType, boolean, (visible: boolean)=>void]
}