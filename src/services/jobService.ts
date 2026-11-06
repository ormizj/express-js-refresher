import TechnicianLockCache from "../classes/TechnicianLockCache.ts";

export const createJob = async (job: NewJob) => {
    const lockTechnicianCache = TechnicianLockCache.instance();
    try {
        if (job.technician_id) lockTechnicianCache.set(job.technician_id);
    } catch (e) {

    } finally {
        if (job.technician_id) lockTechnicianCache.remove(job.technician_id);
    }
}