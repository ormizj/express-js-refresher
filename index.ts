import express, {type Request, type Response, type NextFunction} from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// MIDDLEWARE
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Global Middleware');
    next();
});

// GET
app.get('/health', (req: Request, res: Response) => {
    res.json({status: 'ok'});
});

class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }
}

app.get('/error', () => {
    throw new HttpError(501, 'Custom Error');
});


// POST
type RegisterBody = { username?: string; password?: string };

app.post('/register', (req: Request<{}, {}, RegisterBody>, res: Response) => {
    if (!req.body) {
        res.status(400).json({error: 'username and password are required'});
        return;
    }
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).json({error: 'username and password are required'});
        return;
    }

    // random string to simulate a hashing algorithm
    const randomStr = Math.random().toString(36).substring(2, 10);
    res.status(201).json({user: {username, password: randomStr}});
});


// ERROR HANDLER
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status ?? 500).json({error: err.message || 'Internal Server Error'});
});

// LISTEN
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});