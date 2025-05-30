export interface EventType {
    eventTypeId: number;
    name: string;
}

export interface Event {
    eventId: number;
    description: string;
    eventType: EventType;
}

export interface Person {
    identificationType: string;
    personType: string;
    firstName: string;
    lastName: string;
    identification: string;
    email?: string | null;
}

export interface Movility {
    id: number;
    orii: boolean;
    direction: string;
    gender: string;
    cta: number;
    entryDate: string;
    exitDate: string;
    originProgram: string;
    destinationProgram: string;
    city: string;
    country: string;
    teacher: string;
    faculty: string;
    funding: string;
    fundingSource: string;
    destination: string;
    origin: string;
    agreement?: Agreement | null;
    event: Event;
    person: Person;
    updatable: boolean;
}

export interface MovilityCrear {
    orii: boolean;
    direction: string;
    gender: string;
    cta: number;
    entryDate: string;
    exitDate: string;
    originProgram: string;
    destinationProgram: string;
    city: string;
    country: string;
    teacher: string;
    faculty: string;
    funding: string;
    fundingSource: string;
    destination: string;
    origin: string;
    agreementId?: number | null;
    event: {
        description: string;
        eventTypeId: number;
    };
    person: Person;
    updatable: boolean;
}

export interface Agreement {
    agreementId: number;
    institution: string;
    agreementNumber: string;
    country: string;
    description: string;
    scope: string;
    startDate: string;
    status: string;
}

// movilityType.ts
export interface MovilityTableProps {
    movilities: Movility[];
    isLoading: boolean;
    emptyMessage: string;
    columns: {
        key: keyof Movility | 'person' | 'event' | 'identificationType';
        header: string;
    }[];
}