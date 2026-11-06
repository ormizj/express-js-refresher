export default abstract class EntityLockCache {
    // locking entities based on id (not using Met<number, boolean>, as a set exiting key replaces the true value
    #cache: Set<number> = new Set();

    public set(id: number): void {
        this.#cache.add(id);
    }

    public get(id: number): boolean {
        return this.#cache.has(id);
    }

    public remove(id: number): void {
        this.#cache.delete(id);
    }

    public clear() {
        this.#cache.clear();
    }
}