export default abstract class EntityException extends Error {
    public code: string;

    protected constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}