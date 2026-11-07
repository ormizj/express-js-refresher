import TechnicianException from "./TechnicianException.ts";

export default class TechnicianLockedException extends TechnicianException {
    constructor() {
        super('Technician is currently locked by another request', 409, '003');
        this.name = 'TechnicianLockedException';
    }
}
