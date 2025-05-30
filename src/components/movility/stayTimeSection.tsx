import { Label } from "@/components/ui/typography/label";
import { Input } from "@/components/ui/form/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { Info } from "lucide-react";

interface StayTimeSectionProps {
    entryDate: string;
    exitDate: string;
    stayDays: number;
    movilityYear: string;
    errors: Record<string, string>;
    setters: {
        setEntryDate: (value: string) => void;
        setExitDate: (value: string) => void;
        setStayDays: (value: number) => void;
        setMovilityYear: (value: string) => void;
    };
    handleEntryDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleExitDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formatDateToInput: (date: string) => string;
    direction: string;
}

export function StayTimeSection({
    entryDate,
    exitDate,
    stayDays,
    movilityYear,
    errors,
    // Setters
    handleEntryDateChange,
    handleExitDateChange,
    formatDateToInput,
    direction = "INCOMING_IN_PERSON"
}: StayTimeSectionProps) {

    // Determinar si es INCOMING u OUTGOING
    const entryLabel = direction.includes("INCOMING")
        ? "Fecha de entrada (inicio movilidad)"
        : "Fecha de salida (inicio movilidad)";

    const exitLabel = direction.includes("INCOMING")
        ? "Fecha de salida (fin movilidad)"
        : "Fecha de entrada (fin movilidad)";

    return (
        <div className="p-4 rounded-md">
            <h2 className="text-2xl font-bold text-blue">Tiempo de la estancia</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="entryDate">{entryLabel}</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione en el calendario o escriba la fecha</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="entryDate"
                        type="date"
                        value={formatDateToInput(entryDate)}
                        onChange={handleEntryDateChange}
                        className={errors.entryDate && "border-error"}
                    />
                    {errors.entryDate && <p className="text-sm text-error">{errors.entryDate}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="exitDate">{exitLabel}</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Seleccione en el calendario o escriba la fecha</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="exitDate"
                        type="date"
                        value={formatDateToInput(exitDate)}
                        onChange={handleExitDateChange}
                        className={errors.exitDate && "border-error"}
                    />
                    {errors.exitDate && <p className="text-sm text-error">{errors.exitDate}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="stayDays">Días de estancia</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Se llena automáticamente una vez se haya ingresado la fecha de entrada y la de salida</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="stayDays"
                        type="text"
                        value={stayDays || 0}
                        disabled
                        placeholder={!entryDate || !exitDate ? "Ingrese ambas fechas" : "Calculando..."}
                    />
                    {(!entryDate || !exitDate) && (
                        <p className="text-sm font-semibold text-tertiary">Complete ambas fechas para calcular los días</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="movilityYear">Año de movilidad</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Año en el que se reporta la movilidad. Este campo se llena automáticamente</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input
                        id="movilityYear"
                        type="text"
                        value={movilityYear}
                        disabled
                    />
                </div>
            </div>
        </div>
    );
}