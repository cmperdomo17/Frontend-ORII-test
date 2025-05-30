export const CTADict: Record<string, string> = {
    "1": "Periodo 1",
    "2": "Periodo 2"
}

export const scopeDict: Record<string, string> = {
    "Nacional": "Nacional",
    "Internacional": "Internacional",
};

export const genderDict: Record<string, string> = {
    "M": "Masculino",
    "F": "Femenino",
};

export const roleDict: Record<string, string> = {
    STUDENT: "Estudiante",
    TEACHER: "Docente",
    ADMIN: "Administrativo",
};

export const movilityTypeDict: Record<string, string> = {
    "INCOMING_IN_PERSON": "Entrante en persona",
    "OUTGOING_IN_PERSON": "Saliente en persona",
    "INCOMING_VIRTUAL": "Entrante virtual",
    "OUTGOING_VIRTUAL": "Saliente virtual",
};

export const facultyDict: Record<string, string> = {
    FA: "Facultad de Artes",
    FCA: "Facultad de Ciencias Agrarias",
    FCS: "Facultad de Ciencias de la Salud",
    FCCEA: "Facultad de Ciencias Contables, Económicas y Administrativas",
    FCH: "Facultad de Ciencias Humanas",
    FACNED: "Facultad de Ciencias Naturales, Exactas y de la Educación",
    FDCPS: "Facultad de Derecho, Ciencias Políticas y Sociales",
    FIC: "Facultad de Ingeniería Civil",
    FIET: "Facultad de Ingeniería Electrónica y Telecomunicaciones",
};

export const eventTypeDict: Record<string, string> = {
    "1": "Asistencia a evento",
    "2": "Misión",
    "3": "Curso corto",
    "4": "Estancia o pasantía de investigación",
    "5": "Intercambio",
    "6": "Rotación médica",
    "7": "Profesor visitante o saliente",
    "8": "Voluntariado",
    "9": "Otro"
};

export const eventDescriptions = {
    0: "En base al evento escogido en el campo 'Tipo de evento', agrega lo solicitado para el tipo de evento.",
    1: 'Puede ser congreso, taller, seminario, simposio. Agrega el nombre del evento.',
    2: 'Agrega una descripción resumida.',
    3: 'Agrega una descripción resumida.',
    4: 'Agrega una descripción resumida.',
    5: 'Semestre de intercambio, Opción trabajo de grado en la modalidad profundización, Internado Rotatorio, debe especificar.',
    6: 'Nombre de la Rotación',
    7: 'Agrega una breve descripción de las actividades que realizará.',
    8: 'Descripción de las actividades a desarrollar durante el tiempo autorizado para el Voluntariado.',
    9: 'Agrega una descripción resumida.',
};

export const documentTypeDict: Record<string, string> = {
    "TI": "Tarjeta de Identidad",
    "CC": "Cédula de Ciudadanía",
    "CE": "Cédula de Extranjería",
    "PS": "Pasaporte",
    "V": "Visa",
};

export interface FilterState {
    facultad?: string;
    programa?: string;
    tipo?: string;
    ambito?: string;
}

export interface MovilityProps {
    id: number;
    title: string;
    institution: string;
    type: string;
    ambito: string;
    facultad: string;
    programa: string;
    fechaInicio?: string;
    fechaFin?: string;
    estado?: string;
}

export const formatDateToBackend = (isoDate: string): string => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
};

export const formatDateToInput = (backendDate: string): string => {
    if (!backendDate) return "";
    const [day, month, year] = backendDate.split("-");
    return `${year}-${month}-${day}`;
};

export const handleEntryDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEntryDate: (date: string) => void,
    exitDate: string,
    setExitDate: (date: string) => void,
    setStayDays: (days: number) => void,
    setMovilityYear: (year: string) => void,
    setIsDirty?: (dirty: boolean) => void
) => {
    const newEntryDateIso = e.target.value;
    const newEntryDateFormatted = formatDateToBackend(newEntryDateIso);

    setEntryDate(newEntryDateFormatted);
    setMovilityYear(new Date(newEntryDateIso).getFullYear().toString());
    setIsDirty?.(true);

    setExitDate("");
    setStayDays(0);
    setIsDirty?.(true);

    // Validar si la fecha de salida existente es menor que la nueva fecha de entrada
    if (exitDate) {
        const exitDateIso = formatDateToInput(exitDate);
        if (new Date(exitDateIso) < new Date(newEntryDateIso)) {
            setExitDate("");
            setStayDays(0);
        } else {
            calculateStayDays(newEntryDateIso, exitDateIso, setStayDays);
        }
        setIsDirty?.(true);
    }

    // Establecer el mínimo para el input de fecha de salida
    const exitDateInput = document.getElementById("exitDate") as HTMLInputElement;
    if (exitDateInput) {
        exitDateInput.min = newEntryDateIso;
    }
};

import { toast } from "sonner";

export const handleExitDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    entryDate: string,
    setExitDate: (date: string) => void,
    setStayDays: (days: number) => void,
    setIsDirty?: (dirty: boolean) => void
) => {
    const newExitDateIso = e.target.value;
    const entryDateIso = entryDate ? formatDateToInput(entryDate) : null;

    if (entryDateIso && new Date(newExitDateIso) < new Date(entryDateIso)) {
        toast.error("La fecha de fin no puede ser anterior a la fecha de inicio");
        setExitDate("");
        return; 
    }

    const newExitDateFormatted = formatDateToBackend(newExitDateIso);
    setExitDate(newExitDateFormatted);
    setIsDirty?.(true);

    if (entryDateIso) {
        calculateStayDays(entryDateIso, newExitDateIso, setStayDays);
        setIsDirty?.(true);
    }
};

const calculateStayDays = (
    startDateIso: string,
    endDateIso: string,
    setStayDays: (days: number) => void
) => {
    if (!startDateIso || !endDateIso) {
        setStayDays(0);
        return;
    }

    const start = new Date(startDateIso);
    const end = new Date(endDateIso);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let diffDays = 0;
    if (end >= start) {
        const diffTime = end.getTime() - start.getTime();
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    setStayDays(diffDays);
};

export const handleExitDateChangeView = (entryDate: string, exitDate: string) => {
    if (!entryDate || !exitDate) return "Fechas no disponibles";

    const parseDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split("-");
        return new Date(`${year}-${month}-${day}`);
    };

    const start = parseDate(entryDate);
    const end = parseDate(exitDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Fechas inválidas";

    const diffTime = Math.abs(end.getTime() - start.getTime());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    diffDays += 1;

    return diffDays;
};