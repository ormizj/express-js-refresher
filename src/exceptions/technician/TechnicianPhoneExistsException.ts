import TechnicianException from "./TechnicianException.ts";

export default class TechnicianPhoneExistsException extends TechnicianException {
    constructor() {
        super('Technician phone is already in use', 409, '001');
        this.name = 'TechnicianPhoneExistsException';
    }
}
