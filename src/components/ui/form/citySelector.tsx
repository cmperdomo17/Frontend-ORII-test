import { useState, useEffect, useMemo, useCallback } from "react";
import cities from "cities-list";
import { Label } from "../typography/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../navigation/tooltip";
import { Info } from "lucide-react";
import ErrorMessage from "../feedback/error-message";

interface CitySelectorProps {
  id: string;
  label: string;
  tooltipText: string;
  error?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  debounceTime?: number;
}

const ALL_CITIES = Object.keys(cities as Record<string, any>);

export default function CitySelector({
  id,
  label,
  tooltipText,
  error,
  defaultValue = "",
  onValueChange,
  debounceTime = 300,
}: CitySelectorProps) {
  const [city, setCity] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Función de filtrado memoizada
  const filteredCities = useMemo(() => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return ALL_CITIES
      .filter(cityName => cityName.toLowerCase().includes(lowerQuery))
      .slice(0, 100);
  }, [query]);

  const handleCitySelect = useCallback((cityName: string) => {
    setCity(cityName);
    onValueChange(cityName);
    setIsOpen(false);
    setQuery("");
  }, [onValueChange]);

  // Efecto para sincronizar el valor por defecto
  useEffect(() => {
    setCity(defaultValue);
  }, [defaultValue]);

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative" onClick={e => e.stopPropagation()}>
        <input
          id={id}
          type="text"
          value={query || city}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full p-2 border rounded-full ${
            error ? "border-error" : "border-blueDark/20"
          }`}
          placeholder="Buscar ciudad..."
          autoComplete="off"
        />

        <AnimatedDropdown isOpen={isOpen}>
          {filteredCities.length > 0 ? (
            filteredCities.map((cityName) => (
              <div
                key={cityName}
                className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => handleCitySelect(cityName)}
              >
                {cityName}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">
              {query ? "No se encontraron ciudades" : "Escribe para buscar ciudades"}
            </div>
          )}
        </AnimatedDropdown>
      </div>

      <ErrorMessage message={error} />
    </div>
  );
}

// Componente auxiliar para animación
const AnimatedDropdown = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto rounded-md border border-gray-300 animate-fade-in">
      {children}
    </div>
  );
};