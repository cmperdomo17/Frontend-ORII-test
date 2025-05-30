"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog";

export function UnsavedChangesModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-md rounded-lg border-l-4 border-redLight"
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 4px 12px rgba(0, 0, 66, 0.15)'
        }}
      >
        <DialogHeader>
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-redLight mt-0.5 flex-shrink-0 h-5 w-5" />
            <div>
              <DialogTitle className="text-blue font-semibold text-lg">
                ¿Deseas salir?
              </DialogTitle>
              <DialogDescription className="pt-2 text-blueDark text-base font-medium">
                Los cambios realizados no se guardarán si abandonas esta página.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-blue border-blue hover:bg-blueDark/10 rounded-full"
          >
            Cancelar
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-redLight hover:bg-red text-white"
          >
            Salir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}