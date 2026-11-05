import pool from "../database/pool.ts";

export const createTechnician = async (technician: NewTechnician): Promise<Technician> => {
    try {
        const result = await pool.query<Technician>(
            `INSERT INTO technicians (name, email, phone, is_active)
            VALUES ($1, $2, $3, COALESCE($4, true))
            RETURNING *`,
            [technician.name, technician.email, technician.phone, technician.is_active],
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getTechnician = async (id: number): Promise<Technician> => {
    try {
        const result = await pool.query<Technician>(
            'SELECT * FROM technicians WHERE id = $1',
            [id]
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const technicianEmailExists = async (email: string): Promise<boolean> => {
    try {
        const result = await pool.query<{ exists: boolean }>(
            'SELECT EXISTS (SELECT 1 FROM technicians WHERE email = $1)',
            [email],
        );
        return result.rows[0].exists;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const technicianPhoneExists = async (phone: string): Promise<boolean> => {
    try {
        const result = await pool.query<{ exists: boolean }>(
            'SELECT EXISTS (SELECT 1 FROM technicians WHERE phone = $1)',
            [phone],
        );
        return result.rows[0].exists;
    } catch (e) {
        console.error(e);
        throw e;
    }
}