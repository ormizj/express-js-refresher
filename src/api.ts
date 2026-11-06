import {Router, type Request, type Response} from "express";
import * as customerService from './services/customerService.ts';
import * as technicianService from './services/technicianService.ts';
import EntityException from "./exceptions/EntityException.ts";

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

router.post('/jobs/book', (req: Request, res: Response) => {

});


export default router;