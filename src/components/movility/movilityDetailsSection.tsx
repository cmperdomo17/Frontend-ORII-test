import { useRef, useEffect } from "react";
import { Label } from "@/components/ui/typography/label";
import { Input } from "@/components/ui/form/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { Info } from "lucide-react";
import CountrySelector from "@/components/ui/form/countrySelector";
import CitySelector from "@/components/ui/form/citySelector";
import LabeledInput from "@/components/ui/form/labeledInput";

interface MovilityDetailsSectionProps {
    origin: string;
    destination: string;
    country: string;
    city: string;
    errors: Record<string, string>;
    setters: {
        setOriginUniversity: (value: string) => void;
        setDestinationUniversity: (value: string) => void;
        setCountry: (value: string) => void;
        setCity: (value: string) => void;
    };
}

export function MovilityDetailsSection({
    origin,
    destination,
    country,
    city,
    errors,
    setters
}: MovilityDetailsSectionProps) {
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
    }, []);

    const handleCountryChange = (value: string) => {
        if (!isFirstLoad.current) {
            setters.setCountry(value);
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-2xl font-bold text-blue">Detalles de la movilidad</h2>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <LabeledInput
                        label="Universidad de origen"
                        value={origin}
                        name="origin"
                        type="text"
                        placeholder="Ingrese el nombre de la universidad de origen"
                        tooltipText="Nombre de la universidad de origen"
                        onChange={(e) => setters.setOriginUniversity(e.target.value)}
                        className={errors.origin ? "border-error" : ""}
                    />
                    {errors.origin && <p className="text-sm text-error">{errors.origin}</p>}
                </div>

                <div className="space-y-2">
                    <LabeledInput
                        label="Universidad de destino"
                        value={destination}
                        name="destination"
                        type="text"
                        placeholder="Ingrese el nombre de la universidad de destino"
                        tooltipText="Nombre de la universidad de acogida"
                        onChange={(e) => setters.setDestinationUniversity(e.target.value)}
                        className={errors.destination ? "border-error" : ""}
                    />
                    {errors.destination && <p className="text-sm text-error">{errors.destination}</p>}
                </div>

                <div className="space-y-2">
                    <CountrySelector
                        key={country}
                        id="country"
                        label="País"
                        defaultValue={country}
                        onValueChange={handleCountryChange}
                        tooltipText="Nombre del país en donde realiza la movilidad"
                        error={errors.country}
                    />
                </div>

                <div className="space-y-2">
                    <CitySelector
                        key={country}
                        id="city"
                        label="Ciudad"
                        tooltipText="Nombre de la ciudad en donde realiza la movilidad"
                        error={errors.city}
                        defaultValue={city}
                        onValueChange={(value) => setters.setCity(value)}
                    />
                </div>
            </div>
        </div>
    );
}