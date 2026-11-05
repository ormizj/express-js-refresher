interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: Date;
}

type NewCustomer = Omit<Customer, 'id' | 'created_at'>;