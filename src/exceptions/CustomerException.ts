import EntityException from "./EntityException.ts";

export default abstract class CustomerException extends EntityException {
    protected constructor(message: string, code: string) {
        super(message, `CUS-${code}`);
    }
}