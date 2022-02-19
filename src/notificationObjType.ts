import {ThemeType} from "@t";

export type NotificationObjType = {
    type?: keyof ThemeType["notification"]["backgroundColors"]
    title?: string
    description?: string
}