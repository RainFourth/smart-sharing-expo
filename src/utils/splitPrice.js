function splitPrice(price) {
    return `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export { splitPrice };