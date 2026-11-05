interface Technician {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    created_at: Date;
}

type NewTechnician = Omit<Technician, 'id' | 'created_at' | 'is_active'> & { is_active?: boolean };