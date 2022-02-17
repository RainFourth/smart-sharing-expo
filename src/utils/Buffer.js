class Buffer {
    constructor(data = []) {
        this._data = data;
    }

    async getData() {
        return this._data;
    }

    async addElement(el) {
        if (this._data.length === 0 || !this._data.find(element => element.id === el.id)) {
            this._data.push(el);
        }
    }

    async getItems(ids) {
        const data = await this.getData();
        let items = data.filter(el => Boolean(ids.find(id => el.id === id)));

        return items;
    }
}

export { Buffer };