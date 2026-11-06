import * as technicianRepo from '../repository/technicianRepository.ts';
import TechnicianEmailExistsException from "../exceptions/technician/TechnicianEmailExistsException.ts";
import TechnicianPhoneExistsException from "../exceptions/technician/TechnicianPhoneExistsException.ts";

export const createTechnician = async (technician: NewTechnician) => {
    if (await technicianRepo.technicianEmailExists(technician.email)) {
        throw new TechnicianEmailExistsException();
    }
    if (await technicianRepo.technicianPhoneExists(technician.phone)) {
        throw new TechnicianPhoneExistsException();
    }
    return await technicianRepo.createTechnician(technician);
}
