import { Label } from "@/components/ui/typography/label";
import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/basic-select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { genderDict, roleDict, documentTypeDict } from "@/utils/movilityUtils"
import { Info } from "lucide-react";
import { SelectField } from "@/components/ui/form/selectField";
import LabeledInput from "@/components/ui/form/labeledInput";

interface PersonDataSectionProps {
    firstName: string;
    lastName: string;
    gender: string;
    personType: string;
    identificationType: string;
    identification: string;
    email: string;
    errors: Record<string, string>;
    setters: {
        setFirstName: (value: string) => void;
        setLastName: (value: string) => void;
        setGender: (value: string) => void;
        setRole: (value: string) => void;
        setDocumentType: (value: string) => void;
        setDocumentNumber: (value: string) => void;
        setEmail: (value: string) => void;
    };
}

export function PersonDataSection({
    firstName,
    lastName,
    gender,
    personType,
    identificationType,
    identification,
    email,
    errors,
    setters
}: PersonDataSectionProps) {
    return (
        <div className="p-4 rounded-md">
            <h2 className="text-2xl font-bold text-blue">Datos de la persona movilizada</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <LabeledInput
                        label="Nombre (s)"
                        value={firstName}
                        name="firstName"
                        type="text"
                        placeholder="Ingrese el nombre de la persona movilizada"
                        tooltipText="Nombre de la persona movilizada, conforme está escrito en el documento de identificación"
                        onChange={(e) => setters.setFirstName(e.target.value)}
                        className={errors.firstName ? "border-error" : ""}
                    />
                    {errors.firstName && <p className="text-sm text-error">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                    <LabeledInput
                        label="Apellidos"
                        value={lastName}
                        name="lastName"
                        type="text"
                        tooltipText="Apellidos de la persona, conforme está escrito en el documento de identificación"
                        placeholder="Ingrese el apellido de la persona movilizada"
                        onChange={(e) => setters.setLastName(e.target.value)}
                        className={errors.lastName ? "border-error" : ""}
                    />
                </div>

                <div className="space-y-2">

                    <SelectField
                        id="gender"
                        label="Género"
                        tooltipText="Seleccione el género de la persona"
                        options={Object.entries(genderDict).map(([value, label]) => ({
                            value,
                            label,
                        }))}
                        value={gender}
                        onValueChange={(value) => setters.setGender(value)}
                        error={typeof errors.gender === "string" ? errors.gender : undefined}
                        className={errors.gender ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione el género"
                    />
                </div>

                <div className="space-y-2">
                    <SelectField
                        id="personType"
                        label="Rol"
                        tooltipText="Seleccione el rol de la persona"
                        options={Object.entries(roleDict).map(([value, label]) => ({
                            value,
                            label,
                        }))}
                        value={personType}
                        onValueChange={(value) => setters.setRole(value)}
                        error={typeof errors.personType === "string" ? errors.personType : undefined}
                        className={errors.personType ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione el rol"
                    />
                </div>

                <div className="space-y-2">
                    <SelectField
                        id="identificationType"
                        label="Tipo de documento"
                        tooltipText="Seleccione el tipo de documento de identificación"
                        options={Object.entries(documentTypeDict).map(([value, label]) => ({
                            value,
                            label,
                        }))}
                        value={identificationType}
                        onValueChange={(value) => setters.setDocumentType(value)}
                        error={typeof errors.identificationType === "string" ? errors.identificationType : undefined}
                        className={errors.identificationType ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione el tipo de documento"
                    />
                </div>

                <div className="space-y-2">
                    <LabeledInput
                        label="Identificación"
                        value={identification}
                        name="identification"
                        type="text"
                        tooltipText="Ingrese el número de documento de identificación, sin puntos, comas ni caracteres especiales."
                        placeholder="Ingrese el número de documento de identificación"
                        onChange={(e) => setters.setDocumentNumber(e.target.value)}
                        className={errors.identification ? "border-error" : ""}
                    />
                </div>

                <div className="space-y-2">
                    <LabeledInput
                        label="Correo electrónico"
                        value={email}
                        name="email"
                        type="text"
                        placeholder="Ingrese el correo electrónico de la persona movilizada"
                        onChange={(e) => setters.setEmail(e.target.value)}
                        className={errors.email ? "border-error" : ""}
                    />
                </div>
            </div>
        </div>
    );
}