class Item {
    constructor(itemCode, name, qty, price) {
        this._id = id;
        this._name = name;
        this._qty = qty;
        this._price = price;
        this._itemCode = itemCode;
    }


    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
}