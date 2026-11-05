import express, {type Request, type Response, type NextFunction} from 'express';
import routeIndex from "./src/routes.ts";
import routeApi from "./src/api";

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

// LISTEN
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});