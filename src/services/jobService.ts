import TechnicianLockCache from "../classes/TechnicianLockCache.ts";
import * as jobRepo from '../repository/jobRepository.ts';
import JobTimeTakenException from "../exceptions/job/JobTimeTakenException.ts";
import JobTimeInPastException from "../exceptions/job/JobTimeInPastException.ts";
import TechnicianLockedException from "../exceptions/technician/TechnicianLockedException.ts";


export const createJob = async (job: NewJob) => {
    const lockTechnicianCache = TechnicianLockCache.instance();
    // thrown outside the try, so the finally doesn't release a lock owned by another request
    if (job.technician_id && lockTechnicianCache.get(job.technician_id)) throw new TechnicianLockedException();

    try {
        if (job.technician_id) lockTechnicianCache.set(job.technician_id);

        if (job.start_time && job.end_time) {
            const now = new Date();
            if (new Date(job.start_time) < now || new Date(job.end_time) < now) {
                throw new JobTimeInPastException();
            }
            if (job.technician_id && await jobRepo.isJobExistsBetween(job.technician_id, job.start_time, job.end_time)) {
                throw new JobTimeTakenException();
            }
        }

        await jobRepo.createJob(job);
    } finally {
        if (job.technician_id) lockTechnicianCache.remove(job.technician_id);
    }
}