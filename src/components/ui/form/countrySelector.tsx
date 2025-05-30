import { COUNTRIES } from "@/lib/countries";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, RefObject, useState } from "react";
import { Label } from "../typography/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../navigation/tooltip";
import { Info } from "lucide-react";
import ErrorMessage from "../feedback/error-message";

export interface CountrySelectorProps {
  id: string;
  disabled?: boolean;
  label: string;
  tooltipText: string;
  error?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
}

export default function CountrySelector({
  id,
  disabled = false,
  label,
  tooltipText,
  error,
  defaultValue,
  onValueChange,
}: CountrySelectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState(defaultValue ? defaultValue : "");

  const selectedValue = COUNTRIES.find(
    (option) => option.title === country
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(!isOpen);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen, setIsOpen]);

  const [query, setQuery] = useState("");

  return (
    <div ref={ref}>
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

        <button
          type="button"
          className={`${
            disabled ? "bg-neutral-100" : error ? "border-error" : "bg-white"
          } h-9 relative w-full border border-blueDark/20 rounded-2xl shadow-sm px-3 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-ring text-sm`}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="truncate flex items-center">
            {selectedValue ? (
              <>
                <img
                  alt={selectedValue.value}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
                  className="inline mr-2 h-4"
                />
                {selectedValue.title}
              </>
            ) : (
              <span className="text-blueDark/70">Selecciona un país</span>
            )}
          </span>

          <span
            className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
              disabled ? "hidden" : ""
            }`}
          >
            <svg
              className="h-5 w-5 text-blueDark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="sticky top-0 z-10 bg-white">
                <li className=" text-gray-900 cursor-default select-none relative py-2 px-2">
                  <input
                    type="search"
                    name="search"
                    autoComplete={"off"}
                    className="px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring block w-full text-base sm:text-sm border-gray-300 rounded-md"
                    placeholder={"Buscar un país"}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </li>
                <hr />
              </div>

              <div
                className={
                  "max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll"
                }
              >
                {COUNTRIES.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No se encontró el país
                  </li>
                ) : (
                  COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase())
                  ).map((value, index) => {
                    return (
                      <li
                        key={`${id}-${index}`}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                        id="listbox-option-0"
                        role="option"
                        onClick={() => {
                          setCountry(value.title);
                          onValueChange(value.title);
                          setQuery("");
                          setIsOpen(!isOpen);
                        }}
                      >
                        <img
                          alt={`${value.value}`}
                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                          className={"inline mr-2 h-4"}
                        />

                        <span className="font-normal truncate">
                          {value.title}
                        </span>
                        {value.value === selectedValue?.value ? (
                          <span className="text-blueDark absolute inset-y-0 right-0 flex items-center pr-5">
                            <svg
                              className="size-6"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </li>
                    );
                  })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <ErrorMessage message={error} />
    </div>
  );
}
