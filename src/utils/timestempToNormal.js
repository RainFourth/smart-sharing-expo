function timestampToNormal(timestamp, type = 'time') {
    const date = new Date(timestamp * 1000);
    let hours = `${date.getHours()}`;
    let minutes = `${date.getMinutes()}`;
    let day = `${date.getDate()}`;
    let month = `${date.getMonth() + 1}`;
    let year = `${date.getFullYear()}`;

    if (hours.length === 1) hours = `0${hours}`;
    if (minutes.length === 1) minutes = `0${minutes}`;
    if (day.length === 1) day = `0${day}`;
    if (month.length === 1) month = `0${month}`;

    if (type === 'time')
        return `${hours}:${minutes} ${day}.${month}.${year}`;
    if (type === 'date')
        return `${day}.${month}.${year}`;
}

export { timestampToNormal };