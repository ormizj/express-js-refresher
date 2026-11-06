import {Router, type Request, type Response} from "express";
import * as customerService from './services/customerService.ts';
import * as technicianService from './services/technicianService.ts';
import * as jobService from './services/jobService.ts';

const router = Router();


router.post('/customer/create', async (req: Request, res: Response) => {
    // skipping customer validations, not relevant for the project
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
});

router.post('/technician/create', async (req: Request, res: Response) => {
    // skipping technician validations, not relevant for the project
    const technician = await technicianService.createTechnician(req.body);
    res.status(201).json(technician);
});

router.post('/jobs/book', async (req: Request, res: Response) => {
    // skipping job validations, not relevant for the project
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
});


export default router;