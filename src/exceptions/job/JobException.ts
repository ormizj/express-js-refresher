import EntityException from "../EntityException.ts";

export default abstract class JobException extends EntityException {
    protected constructor(message: string, status: number, code: string) {
        super(message, status, `JOB-${code}`);
        this.name = 'JobException';
    }
}
