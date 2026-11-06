import CustomerException from "./CustomerException.ts";

export default class CustomerPhoneExistsException extends CustomerException {
    constructor() {
        super('Customer phone is already in use', '001');
    }
}