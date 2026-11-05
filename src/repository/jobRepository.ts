import pool from "../database/pool.ts";

export const createJob = async (job: NewJob): Promise<Job> => {
    try {
        const result = await pool.query<Job>(
            `INSERT INTO jobs (customer_id, technician_id, title, description, status, scheduled_at)
            VALUES ($1, $2, $3, $4, COALESCE($5, 'pending'), $6)
            RETURNING *`,
            [job.customer_id, job.technician_id, job.title, job.description, job.status, job.scheduled_at],
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getJob = async (id: number): Promise<Job> => {
    try {
        const result = await pool.query<Job>(
            'SELECT * FROM jobs WHERE id = $1',
            [id]
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getJobsByCustomer = async (customerId: number): Promise<Job[]> => {
    try {
        const result = await pool.query<Job>(
            'SELECT * FROM jobs WHERE customer_id = $1 ORDER BY created_at DESC',
            [customerId]
        );
        return result.rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getJobsByTechnician = async (technicianId: number): Promise<Job[]> => {
    try {
        const result = await pool.query<Job>(
            'SELECT * FROM jobs WHERE technician_id = $1 ORDER BY scheduled_at',
            [technicianId]
        );
        return result.rows;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const assignTechnician = async (jobId: number, technicianId: number | null): Promise<Job> => {
    try {
        const result = await pool.query<Job>(
            'UPDATE jobs SET technician_id = $2 WHERE id = $1 RETURNING *',
            [jobId, technicianId]
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const updateJobStatus = async (jobId: number, status: JobStatus): Promise<Job> => {
    try {
        const result = await pool.query<Job>(
            'UPDATE jobs SET status = $2 WHERE id = $1 RETURNING *',
            [jobId, status]
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}