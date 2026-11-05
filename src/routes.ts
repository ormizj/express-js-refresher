import { Router, type Request, type Response, type NextFunction } from 'express';
import HttpError from "./classes/HttpError.ts";

const router = Router();


// GET
router.get('/health', (req: Request, res: Response) => {
    res.json({status: 'ok'});
});


router.get('/error', () => {
    throw new HttpError(501, 'Custom Error');
});


// POST
type RegisterBody = { username?: string; password?: string };

router.post('/register', (req: Request<{}, {}, RegisterBody>, res: Response) => {
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
router.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status ?? 500).json({error: err.message || 'Internal Server Error'});
});

export default router;