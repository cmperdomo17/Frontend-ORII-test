import { Column } from "@/types/agreementType";

export const columns: Column[] = [
    { key: "agreementNumber", header: "Número de convenio" },
    { key: "country", header: "País" },
    { key: "institution", header: "Institución" },
    { key: "description", header: "Descripción" },
    { key: "startDate", header: "Fecha de inicio" },
    //FALTA LA COLUMNA DE TIPO DE CONVENIO (VERIFICAR BACKEND)
];

export const AgreementStatus = [
    { value: "Marco", label: "Marco" },
    { value: "Específico", label: "Específico" },
    { value: "Cotutela", label: "Cotutela" },
]