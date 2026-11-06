import JobException from "./JobException.ts";

export default class JobTimeTakenException extends JobException {
    constructor() {
        super('Job time is already taken for this technician', 409, '001');
        this.name = 'JobTimeTakenException';
    }
}
