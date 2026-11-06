import HttpError from "./HttpError.ts";

export default abstract class EntityException extends HttpError {
    public code: string;

    protected constructor(message: string, status: number, code: string) {
        super(message, status);
        this.name = 'EntityException';
        this.code = code;
    }
}