import CustomerException from "./CustomerException.ts";

export default class CustomerEmailExistsException extends CustomerException {
    constructor() {
        super('Customer phone is already in use', '002');
    }
}