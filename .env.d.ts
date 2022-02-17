
// здесь описываем типы переменных из .env

declare module '@env' {
    export const API_URL: string

    export const NOTIFICATIONS_API_URL: string
    export const NOTIFICATIONS_SOCKET_NAMESPACE: string
    export const NOTIFICATIONS_SOCKET_PATH: string

    export const MESSAGES_URL: string

    export const OAUTH_GOOGLE_SIGN: string
    export const OAUTH_FACEBOOK_SIGN: string

    export const CURRENT_TIMEZONE: string
}