import * as customerRepo from '../repository/customerRepository.ts';
import CustomerEmailExistsException from "../exceptions/customer/CustomerEmailExistsException.ts";
import CustomerPhoneExistsException from "../exceptions/customer/CustomerPhoneExistsException.ts";

export const createCustomer = async (customer: NewCustomer) => {
    if (await customerRepo.customerEmailExists(customer.email)) {
        throw new CustomerEmailExistsException();
    }
    if (await customerRepo.customerPhoneExists(customer.phone)) {
        throw new CustomerPhoneExistsException();
    }
    await customerRepo.createCustomer(customer);
}