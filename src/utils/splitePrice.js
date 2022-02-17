function splitePrice(price) {
    return `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export { splitePrice };