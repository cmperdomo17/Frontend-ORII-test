export interface UserData {
    userId?: number;
    name: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    role: string;
    faculty?: string;
}

export type UserRole = 'SU' | 'ADMIN' | 'USER';

export interface CreateUserResponse {
    success: boolean;
    data?: {
        name: string;
        lastName: string;
        email: string;
        role: string;
        faculty: string;
    }
    error?: string;
    field?: 'name' | 'lastName' | 'email' | 'role' | 'faculty' | 'root';
}

// Interfaces para componentes

export interface UsersHeaderProps {
    title: string;
    description?: string;
    onSearch?: (value: string) => void;
    onFilter?: (filterType: string, value?: string) => void;
    searchTerm?: string;
    users?: UserData[];
    role: UserRole;
}

export interface UsersTableProps {
    users: UserData[];
    isLoading: boolean;
    emptyMessage: string;
    columns: Column[];
    reloadUsers?: () => void;
    role: UserRole;
}

export interface Column {
    key: keyof UserData;
    header: string;
}