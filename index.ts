import express, {type Request, type Response, type NextFunction} from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use((req: Request, res: Response,next:NextFunction) => {
    console.log('Global Middleware');
    next();
});

app.get('/health', (req: Request, res: Response) => {
    res.json({status: 'ok'});
});

app.use((err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

app.post('/register', (req: Request<{ username: string, password: string }>, res: Response) => {
    const username = req.params.username;
    const password = req.params.password;

    if (!username || !password) return   res.status(500).json({ error: err.message });


    res.json({user: {username,password}});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});