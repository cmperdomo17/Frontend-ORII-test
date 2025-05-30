interface MovilityFields {
    firstName?: string;
    lastName?: string;
    gender?: string;
    cta?: number;
    personType?: string;
    identificationType?: string;
    identification?: string;
    email?: string;
    direction?: string;
    faculty?: string;
    eventTypeId?: number;
    description?: string;
    origin?: string;
    destination?: string;
    country?: string;
    city?: string;
    originProgram?: string;
    destinationProgram?: string;
    teacher?: string;
    agreement?: string;
    agreementId?: number;
    funding?: string;
    fundingSource?: string;
    entryDate?: string;
    exitDate?: string;
    stayDays?: number;
    movilityYear?: string;
}

interface FieldValidation {
    required?: boolean;
    pattern?: RegExp;
    customValidator?: (value: unknown, fields?: MovilityFields) => string | null;
}

const fieldValidations: Record<keyof MovilityFields, FieldValidation> = {
    firstName: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    lastName: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    gender: { required: true },
    cta: { required: true },
    personType: { required: true },
    identificationType: { required: true },
    identification: {
        required: true,
        pattern: /^[0-9]+$/,
    },
    email: {
        required: true,
        customValidator: (value: unknown) => {
            if (typeof value !== 'string') {
                return "El correo debe ser una cadena de texto";
            }
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "El correo electrónico debe ser válido (debe contener @ y dominio)";
            }
            return null;
        }
    },
    direction: { required: true },
    faculty: { required: true },
    eventTypeId: { required: true },
    description: { required: true },
    origin: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    destination: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    country: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    city: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    originProgram: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    destinationProgram: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    teacher: {
        required: false,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    agreement: { required: true },
    agreementId: {
        required: false,
        customValidator: (value: unknown, fields?: MovilityFields) =>
            fields?.agreement === "Y" && !value ? "El número de convenio es obligatorio." : null
    },
    funding: {
        required: true,
        customValidator: (value: unknown) => {
            const numericValue = Number(value);
            if (isNaN(Number(numericValue))) {
                return "El valor de financiación debe ser un número";
            }
            if (Number(numericValue) < 0) {
                return "La financiación no puede ser negativa";
            }
            if (numericValue > 99999999) {
                return "La financiación no puede superar los 99,999,999";
            }
            return null;
        }
    },
    fundingSource: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    },
    entryDate: { required: true },
    exitDate: { required: true },
    stayDays: { required: false },
    movilityYear: { required: false },
};

const fieldDisplayNames: Record<keyof MovilityFields, string> = {
    firstName: "nombre(s)",
    lastName: "apellidos",
    gender: "género",
    cta: "semestre",
    personType: "rol",
    identificationType: "tipo de documento",
    identification: "número de documento",
    email: "correo electrónico",
    direction: "sentido de movilidad",
    faculty: "facultad",
    eventTypeId: "tipo de evento",
    description: "descripción del evento",
    origin: "universidad de origen",
    destination: "universidad de destino",
    country: "país",
    city: "ciudad",
    originProgram: "programa de origen",
    destinationProgram: "programa de acogida",
    teacher: "tutor académico",
    agreement: "convenio",
    agreementId: "número de convenio",
    funding: "valor de financiación",
    fundingSource: "fuente de financiación",
    entryDate: "fecha de entrada",
    exitDate: "fecha de salida",
    stayDays: "días de estancia",
    movilityYear: "año de movilidad"
};

export const validateFields = (fields: MovilityFields) => {
    console.log("Ciudad veri: ", fields.city);
    const newErrors: Record<string, string> = {};

    for (const [fieldName, validation] of Object.entries(fieldValidations)) {
        const value = fields[fieldName as keyof MovilityFields];
        const displayName = fieldDisplayNames[fieldName as keyof MovilityFields] || 'Este campo';

        if (validation.required && (!value || (typeof value === 'string' && !value.trim()))) {
            newErrors[fieldName] = `El campo de ${displayName} es requerido`;
            continue;
        }

        if (value && validation.pattern && !validation.pattern.test(String(value))) {
            newErrors[fieldName] = `El campo ${displayName} contiene caracteres inválidos`;
            continue;
        }

        if (validation.customValidator) {
            // Pasamos fields solo si el validador lo necesita
            const customError = validation.customValidator(value, fields);
            if (customError) {
                newErrors[fieldName] = customError;
            }
        }
    }

    // Validación condicional del tutor académico
    const isStudent = fields.personType === "STUDENT";
    if (isStudent && !fields.teacher) {
        newErrors.teacher = "El tutor académico es obligatorio para estudiantes";
    }

    return newErrors;
};