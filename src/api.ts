import {Router, type Request, type Response} from "express";
import * as customerService from './services/customerService.ts';
import EntityException from "./exceptions/EntityException.ts";

const router = Router();


router.post('/customer/create', async (req: Request, res: Response) => {
    try {
        const customer = await customerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (e) {
        
    }
});

router.post('/jobs/book', (req: Request, res: Response) => {

});


export default router;