import JobException from "./JobException.ts";

export default class JobTimeInPastException extends JobException {
    constructor() {
        super('Job start time and end time cannot be in the past', 400, '002');
        this.name = 'JobTimeInPastException';
    }
}
