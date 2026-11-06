import EntityLockCache from "./EntityLockCache.ts";

export default class TechnicianLockCache extends EntityLockCache {
    static #instance: TechnicianLockCache | null = null;

    private constructor() {
        super();
    }

    public static instance(): TechnicianLockCache {
        if (!this.#instance) this.#instance = new TechnicianLockCache();
        return this.#instance;
    }
}