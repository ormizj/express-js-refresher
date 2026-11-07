import pool from "../database/pool.ts";

export const createJob = async (job: NewJob): Promise<Job> => {
    try {
        const result = await pool.query<Job>(
            `INSERT INTO jobs (customer_id, technician_id, title, description, status, start_time, end_time)
            VALUES ($1, $2, $3, $4, COALESCE($5, 'pending'), $6, $7)
            RETURNING *`,
            [job.customer_id, job.technician_id, job.title, job.description, job.status, job.start_time, job.end_time],
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const isJobExistsBetween = async (technicianId: number, startTime: Date, endTime: Date) => {
    try {
        const result = await pool.query<{ exists: boolean }>(
            `SELECT EXISTS (
                SELECT FROM jobs
                WHERE technician_id = $1
                AND status <> 'cancelled'
                AND start_time < $3
                AND end_time > $2
            );`,
            [technicianId, startTime, endTime],
        );
        return result.rows[0].exists;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
