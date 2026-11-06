import express, {type Request, type Response, type NextFunction} from 'express';
import routeIndex from "./src/routes.ts";
import routeApi from "./src/api.ts";
import pool from "./src/database/pool.ts";
import {migrate} from "./src/database/migration.ts";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/', routeIndex);
app.use('/api', routeApi);

// MIDDLEWARE
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Global Middleware');
    next();
});

// DATABASE
try {
    await pool.query('SELECT 1');
    console.log('Connected to Postgres');
} catch (err) {
    console.error('Failed to connect to Postgres:', err);
    process.exit(1);
}
try {
    await migrate();
    console.log('Migrations synced');
} catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
}

// ERROR HANDLER
interface UnknownError extends Error {
    status?: number;
    code?: string;
}

app.use((err: UnknownError, req: Request, res: Response, next: NextFunction) => {
    // handled error
    if (err.status) {
        res.status(err.status).json({name: err.name, code: err.code})
        return;
    }
    console.error(err);
    res.status(500).json({error: err.message || 'Internal Server Error'});
});

// LISTEN
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});