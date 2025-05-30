// Definición de interfaces

import { FilterState } from "./filterAgreementType";
import { UserRole } from "./userType";

export interface Agreement {
    id?: string;
    scope: 'NATIONAL' | 'INTERNATIONAL';
}

export interface AgreementsData {
    NATIONAL: Agreement[];
    INTERNATIONAL: Agreement[];
    ALL: Agreement[];
}

export interface AgreementProps {
    agreementId?: string;
    agreementNumber: string;
    institution: string;
    description: string;
    country: string;
    startDate: string;
    scope: "NATIONAL" | "INTERNATIONAL";
    status: "ACTIVE" | "INACTIVE";
}

// Interfaces para componentes

export interface AgreementHeaderProps {
    title: string;
    description?: string;
    onSearch?: (value: string) => void;
    onFilter?: (filterType: string, value?: string) => void;
    searchTerm?: string;
    activeFilters?: FilterState;
    agreements: AgreementProps[];
    role: UserRole;
}

export interface AgreementTableProps {
    agreements: AgreementProps[];
    isLoading: boolean;
    emptyMessage: string;
    columns: Column[];
    role: UserRole;
    reloadAgreements?: () => void;
}

export interface Column {
    key: keyof AgreementProps;
    header: string;
}

export interface CreateAgreementProps {
    agreement?: AgreementProps | null;
    onCloseU?: () => void;
}

export const agreementTypes = [
    "Marco",
    "Específico",
    "Cotutela"
] as const
export type AgreementType = (typeof agreementTypes)[number]


