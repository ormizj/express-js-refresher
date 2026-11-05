interface Technician {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    is_active: boolean;
    created_at: Date;
}

type NewTechnician = Omit<Technician, 'id' | 'created_at' | 'is_active'> & { is_active?: boolean };