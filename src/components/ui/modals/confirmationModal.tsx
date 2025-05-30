"use client";

import { Button } from "@/components/ui/buttons/button";
import { AlertCircle } from "lucide-react"; // Icono de alerta

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                className="bg-white p-6 rounded-lg border-l-4 border-redLight w-full max-w-md mx-4" 
                style={{
                    boxShadow: "0px 4px 12px rgba(0, 0, 66, 0.15)" // Sombra con tono azul
                }}
            >
                <div className="flex items-start gap-3">
                    <AlertCircle className="text-redLight mt-0.5 flex-shrink-0" /> {/* Icono de alerta */}
                    <div>
                        <h3 className="text-blue font-semibold text-lg mb-2">Confirmar acción</h3> {/* Color primario */}
                        <p className="text-[#46464F]">{message}</p> {/* Texto en gris oscuro */}
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <Button 
                        onClick={onClose} 
                        variant="outline" 
                        className="text-blue border-blue hover:bg-blueDark/10 rounded-full" // Estilo secundario
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={onConfirm} 
                        className="bg-redLight hover:bg-red text-white" /* Color de error */
                    >
                        Eliminar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;