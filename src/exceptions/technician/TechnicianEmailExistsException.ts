import TechnicianException from "./TechnicianException.ts";

export default class TechnicianEmailExistsException extends TechnicianException {
    constructor() {
        super('Technician email is already in use', 409, '002');
        this.name = 'TechnicianEmailExistsException';
    }
}
