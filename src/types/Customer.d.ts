interface Customer {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    created_at: Date;
}

type NewCustomer = Omit<Customer, 'id' | 'created_at'>;