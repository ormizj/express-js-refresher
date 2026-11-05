import pool from "../database/pool.ts";

export const createCustomer = async (customer: NewCustomer): Promise<Customer> => {
    try {
        const result = await pool.query<Customer>(
            `INSERT INTO customers (name, email, phone, address)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [customer.name, customer.email, customer.phone, customer.address],
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getCustomer = async (id: number): Promise<Customer> => {
    try {
        const result = await pool.query<Customer>(
            'SELECT * FROM customers WHERE id = $1',
            [id]
        );
        return result.rows[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const customerEmailExists = async (email: string): Promise<boolean> => {
    try {
        const result = await pool.query<{ exists: boolean }>(
            'SELECT EXISTS (SELECT 1 FROM customers WHERE email = $1)',
            [email],
        );
        return result.rows[0].exists;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const customerPhoneExists = async (phone: string): Promise<boolean> => {
    try {
        const result = await pool.query<{ exists: boolean }>(
            'SELECT EXISTS (SELECT 1 FROM customers WHERE phone = $1)',
            [phone],
        );
        return result.rows[0].exists;
    } catch (e) {
        console.error(e);
        throw e;
    }
}