type JobStatus = 'pending'| 'scheduled'| 'in_progress'| 'completed'| 'cancelled';

interface Job {
    id: number;
    customer_id: number;
    technician_id: number | null;
    title: string;
    description: string | null;
    status: JobStatus;
    scheduled_at: Date | null;
    created_at: Date;
}

type NewJob = Omit<Job, 'id' | 'created_at' | 'status'> & { status?: JobStatus };