import { Label } from "@/components/ui/typography/label";
import { Input } from "@/components/ui/form/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { Info } from "lucide-react";
import {movilityTypeDict, facultyDict, eventTypeDict, eventDescriptions, CTADict} from "@/utils/movilityUtils"
import { SelectField } from "../ui/form/selectField";

interface GeneralInfoSectionProps {
    direction: string;
    faculty: string;
    eventTypeId: number;
    description: string;
    cta: number;
    errors: Record<string, string>;
    setters: {
        setDirection: (value: string) => void;
        setFaculty: (value: string) => void;
        setEventType: (value: number) => void;
        setEventDescription: (value: string) => void;
        setCta: (value: number) => void;
    };
}

export function GeneralInfoSection({
    direction,
    faculty,
    eventTypeId,
    description,
    cta,
    errors,
    setters
}: GeneralInfoSectionProps) {
    return (
        <div className="p-4 rounded-md">
            <h2 className="text-2xl font-bold text-blue">Información general de la movilidad</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <SelectField
                        id="direction"
                        label="Sentido de movilidad"
                        tooltipText="Seleccione el sentido de movilidad"
                        options={Object.entries(movilityTypeDict).map(([value, label]) => ({
                            label,
                            value,
                        }))}
                        value={direction}
                        onValueChange={(value) => setters.setDirection(value)}
                        error={typeof errors.direction === "string" ? errors.direction : undefined}
                        className={errors.direction ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione el tipo de movilidad"
                    />
                </div>
    
                <div className="space-y-2">
                    <SelectField
                        id="faculty"
                        label="Facultad"
                        tooltipText="Seleccione la facultad a la que pertenece la movilidad"
                        options={Object.entries(facultyDict).map(([value, label]) => ({
                            label,
                            value,
                        }))}
                        value={faculty}
                        onValueChange={(value) => setters.setFaculty(value)}
                        error={typeof errors.faculty === "string" ? errors.faculty : undefined}
                        className={errors.faculty ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione una facultad"
                    />
                </div>
    
                <div className="space-y-2">
                    <SelectField
                        id="eventTypeId"
                        label="Tipo de evento"
                        tooltipText="Seleccione el tipo de evento asociado a la movilidad"
                        options={Object.entries(eventTypeDict).map(([value, label]) => ({
                            label,
                            value,
                        }))}
                        value={eventTypeId ? eventTypeId.toString() : ""}
                        onValueChange={(value) => setters.setEventType(Number(value))}
                        error={typeof errors.eventTypeId === "string" ? errors.eventTypeId : undefined}
                        className={errors.eventTypeId ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione el tipo de evento"
                    />
                </div>
    
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="description">Descripción del evento</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{eventDescriptions[eventTypeId as keyof typeof eventDescriptions]}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setters.setEventDescription(e.target.value)}
                        placeholder="Ingrese la descripción del evento"
                        className={errors.description && "border-error"}
                    />
                    {errors.description && <p className="text-sm text-error">{errors.description}</p>}
                </div>
    
                <div className="space-y-2">
                    <SelectField
                        id="cta"
                        label="Semestre"
                        tooltipText="Seleccione el periodo académico"
                        options={Object.entries(CTADict).map(([value, label]) => ({
                            label,
                            value,
                        }))}
                        value={cta ? cta.toString() : ""}
                        onValueChange={(value) => setters.setCta(Number(value))}
                        error={typeof errors.cta === "string" ? errors.cta : undefined}
                        className={errors.cta ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione el periodo"
                    />
                </div>
            </div>
        </div>
    );
}