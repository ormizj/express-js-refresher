import pool from "./pool.ts";
import schema from "./schema.ts";

export async function migrate() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(schema);
        await client.query('COMMIT');
        console.log('Migrations applied');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}