import { Label } from "@/components/ui/typography/label";
import { Input } from "@/components/ui/form/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { Info } from "lucide-react";
import LabeledInput from "../ui/form/labeledInput";

interface AcademicDetailsSectionProps {
    originProgram: string;
    destinationProgram: string;
    teacher: string;
    personType: string;
    errors: Record<string, string>;
    setters: {
        setOriginProgram: (value: string) => void;
        setDestinationProgram: (value: string) => void;
        setTeacher: (value: string) => void;
    };
}

export function AcademicDetailsSection({
    originProgram,
    destinationProgram,
    teacher,
    personType,
    errors,
    setters
}: AcademicDetailsSectionProps) {
    return (
        <div className="p-4 rounded-md">
            <h2 className="text-2xl font-bold text-blue">Detalles académicos</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <LabeledInput
                        label="Programa de origen"
                        value={originProgram}
                        name="originProgram"
                        type="text"
                        placeholder="Ingrese el nombre del programa de origen"
                        tooltipText="Nombre del programa académico de la universidad de origen"
                        onChange={(e) => setters.setOriginProgram(e.target.value)}
                        className={errors.originProgram ? "border-error" : ""}
                    />
                    {errors.originProgram && <p className="text-sm text-error">{errors.originProgram}</p>}
                </div>
                <div className="space-y-2">
                    <LabeledInput
                        label="Programa de acogida"
                        value={destinationProgram}
                        name="destinationProgram"
                        type="text"
                        placeholder="Ingrese el nombre del programa de acogida"
                        tooltipText="Nombre del programa académico de la universidad de acogida"
                        onChange={(e) => setters.setDestinationProgram(e.target.value)}
                        className={errors.destinationProgram ? "border-error" : ""}
                    />
                    {errors.destinationProgram && <p className="text-sm text-error">{errors.destinationProgram}</p>}
                </div>

                <div className="space-y-2">
                    <LabeledInput
                        label="Tutor académico"
                        value={teacher}
                        name="teacher"
                        type="text"
                        placeholder="Ingrese el nombre del tutor académico"
                        tooltipText="Nombre del tutor académico de la universidad de acogida"
                        onChange={(e) => {
                            if (personType === "STUDENT") {
                                setters.setTeacher(e.target.value);
                            }
                        }}
                        disabled={personType !== "STUDENT"}
                        className={`${personType !== "STUDENT" ? "opacity-50 bg-gray-100" : ""} ${errors.teacher ? "border-error" : ""}`}
                    />
                    {personType === "STUDENT" && errors.teacher && (
                        <p className="text-sm text-error">{errors.teacher}</p>
                    )}
                </div>
            </div>
        </div>
    );
}