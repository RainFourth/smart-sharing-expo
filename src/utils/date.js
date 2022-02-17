function dateToCalendareDateString(date = new Date()) {
    let day = `${date.getDate()}`;
    let month = `${date.getMonth()+1}`;
    let year = `${date.getFullYear()}`;

    if (day.length === 1) day = `0${day}`;
    if (month.length === 1) month = `0${month}`;

    return `${year}-${month}-${day}`
}

export { dateToCalendareDateString };