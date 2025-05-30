export interface FilterState {
    semester?: string | number;
    faculty?: string | number;
    year?: string | number;
}

export interface FilterSelectorProps {
    filterName: string;
    filterValues: string[];
    activeValue?: string;
    onSelect: (value: string) => void;
    onRemove: () => void;
}

export const YearFilter = Array.from(
    { length: new Date().getFullYear() - 2021 + 1 },
    (_, i) => (new Date().getFullYear() - i).toString()
);

export const FacultyFilter = [
    "Facultad de Artes",
    "Facultad de Ciencias Agrarias",
    "Facultad de Ciencias de la Salud",
    "Facultad de Ciencias Contables, Económicas y Administrativas",
    "Facultad de Ciencias Humanas",
    "Facultad de Ciencias Naturales, Exactas y de la Educación",
    "Facultad de Derecho, Ciencias Políticas y Sociales",
    "Facultad de Ingeniería Civil",
    "Facultad de Ingeniería Electrónica y Telecomunicaciones",
];

export const SemesterFilter = [
    "Semestre 1",
    "Semestre 2",
];

export const filterNames = [
    "Año",
    "Semestre",
    "Facultad",
];

export const filterNamesYear = [
    "Año",
    "Facultad",
];

export const filterOptions = {
    year: YearFilter,
    semester: SemesterFilter,
    faculty: FacultyFilter,
};

export const semesterMap = {
    "Semestre 1": 1,
    "Semestre 2": 2
};

export const facultyMap = {
    "Facultad de Ingeniería Electrónica y Telecomunicaciones": 0,
    "Facultad de Ingeniería Civil": 1,
    "Facultad de Ciencias de la Salud": 2,
    "Facultad de Derecho, Ciencias Políticas y Sociales": 3,
    "Facultad de Ciencias Naturales, Exactas y de la Educación": 4,
    "Facultad de Ciencias Humanas": 5,
    "Facultad de Artes": 6,
    "Facultad de Ciencias Agrarias": 7,
    "Facultad de Ciencias Contables, Económicas y Administrativas": 8
};
