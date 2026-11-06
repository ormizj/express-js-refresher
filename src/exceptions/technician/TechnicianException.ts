import EntityException from "../EntityException.ts";

export default abstract class TechnicianException extends EntityException {
    protected constructor(message: string, status: number, code: string) {
        super(message, status, `TEC-${code}`);
        this.name = 'TechnicianException';
    }
}
