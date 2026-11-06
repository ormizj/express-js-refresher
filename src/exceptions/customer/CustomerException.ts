import EntityException from "../EntityException.ts";

export default abstract class CustomerException extends EntityException {
    protected constructor(message: string, status: number, code: string) {
        super(message, status, `CUS-${code}`);
        this.name = 'CustomerException';
    }
}