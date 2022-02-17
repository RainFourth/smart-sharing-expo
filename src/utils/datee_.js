import { Datee } from "@u";

const datee = new Datee({
    timezones: {
        'MSK': 3 * 60 * 60
    },
    templates: {
        dateTime: 'dd.MM.yyyy hh:mm (МСК)',
        date: 'dd.MM.yyyy',
        time: 'hh:mm (МСК)',
        calendar: 'yyyy-MM-dd'
    },
    defaultTemplate: 'dateTime'
})

export { datee };