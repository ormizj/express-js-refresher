import express, {type Request, type Response, type NextFunction} from 'express';
import router from "./src/routes.ts";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/', router);

// MIDDLEWARE
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Global Middleware');
    next();
});

// LISTEN
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});