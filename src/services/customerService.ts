import * as customerRepo from '../repository/customerRepository.ts';

export const createCustomer = async (customer: NewCustomer) => {
    if (await customerRepo.customerEmailExists(customer.email)) {
        throw 'Email is already taken';
    }
    if (await customerRepo.customerPhoneExists(customer.phone)) {
        throw 'Phone is already in use';
    }
    await customerRepo.createCustomer(customer);
}