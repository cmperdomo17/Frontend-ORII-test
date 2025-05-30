import { useState, useEffect } from "react";
import { Label } from "@/components/ui/typography/label";
import { Input } from "@/components/ui/form/input";
import { AgreementProps } from "@/types/agreementType"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { fetchAgreements } from "@/actions/agreementAction";
import { Info } from "lucide-react";
import { SelectField } from "@/components/ui/form/selectField";
import LabeledInput from "@/components/ui/form/labeledInput";

interface AgreementsSectionProps {
    agreement: string;
    agreementId: number;
    funding: string;
    fundingSource: string;
    errors: Record<string, string>;
    setters: {
        setAgreement: (value: string) => void;
        setAgreementId: (value: number) => void;
        setfunding: (value: string) => void;
        setFuenteFinanciacion: (value: string) => void;
    };
}

export function AgreementsSection({
    agreement,
    agreementId,
    funding,
    fundingSource,
    errors,
    setters
}: AgreementsSectionProps) {
    const [agreements, setAgreements] = useState<AgreementProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Cargar convenios al montar el componente o cuando se selecciona "Sí"
    useEffect(() => {
        const loadAgreements = async () => {
            if (agreement === "Y") {
                setIsLoading(true);
                try {
                    const data = await fetchAgreements();
                    setAgreements(data.ALL as AgreementProps[]);
                } catch (error) {
                    console.error("Error loading agreements:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadAgreements();
    }, [agreement]);

    // Crear opciones para el select
    const agreementOptions = agreements.map(agreement => ({
        label: `${agreement.agreementNumber}`,
        value: agreement.agreementId?.toString() || ''
    }));

    const handleAgreementChange = (value: string) => {
        setters.setAgreementId(Number(value));
    };

    return (
        <div className="p-4 rounded-md">
            <h2 className="text-2xl font-bold text-blue">Convenios y patrocinios</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <SelectField
                        id="agreement"
                        label="¿Existe convenio?"
                        tooltipText="Puede verificar si existe convenio, en el apartado CONVENIOS de la página"
                        options={[
                            { label: "Sí", value: "Y" },
                            { label: "No", value: "N" },
                        ]}
                        value={agreement}
                        onValueChange={(value) => setters.setAgreement(value)}
                        error={typeof errors.agreement === "string" ? errors.agreement : undefined}
                        className={errors.agreement ? "border-error text-blueDark" : "text-blueDark"}
                        placeholder="Seleccione una opción"
                    />
                </div>

                {agreement === "Y" && (
                    <div className="space-y-2">
                        <SelectField
                            id="numberAgreement"
                            label="Número de convenio"
                            tooltipText="Seleccione el convenio de la lista"
                            options={agreementOptions}
                            value={agreementId ? agreementId.toString() : ""}
                            onValueChange={(value) => handleAgreementChange(value)}
                            error={typeof errors.agreementId === "string" ? errors.agreementId : undefined}
                            className={errors.agreementId ? "border-error text-blueDark" : "text-blueDark"}
                            placeholder={isLoading ? "Cargando convenios..." : "Seleccione un convenio"}
                            isDisabled={isLoading}
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <LabeledInput
                        label="Valor de la financiación en pesos"
                        value={funding}
                        name="funding"
                        type="text"
                        placeholder="Ingrese el valor de la financiación"
                        tooltipText="Ingrese el valor de la financiación sin signo pesos, ni puntos ni comas"
                        onChange={(e) => setters.setfunding(e.target.value)}
                        className={errors.funding ? "border-error" : ""}
                    />
                    {errors.funding && <p className="text-sm text-error">{errors.funding}</p>}
                </div>

                <div className="space-y-2">
                    <LabeledInput
                        label="Fuente de la financiación"
                        name="fundingSource"
                        value={fundingSource}
                        placeholder="Ingrese la fuente de financiación"
                        onChange={(e) => setters.setFuenteFinanciacion(e.target.value)}
                        className={errors.fundingSource ? "border-error" : ""}
                        tooltipText="Escriba aquí el nombre de la dependencia de la Universidad del Cauca y/o de otra institución que otorgó la financiación o la beca"
                    />
                    {errors.fundingSource && <p className="text-sm text-error">{errors.fundingSource}</p>}
                </div>
            </div>
        </div>
    );
}