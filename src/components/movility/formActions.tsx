import { Button } from "@/components/ui/buttons/button";
import { Loader2, Ban } from "lucide-react";

interface FormActionsProps {
  isSubmitting?: boolean;
  submitButtonText?: string;
  submittingText?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
  icon?: React.ReactNode; // Nuevo prop para el icono
}

export function FormActions({
  isSubmitting = false,
  submitButtonText = "Guardar",
  submittingText = "Guardando...",
  onCancel,
  cancelButtonText = "Cancelar",
  icon = null // Valor por defecto
}: FormActionsProps) {
  return (
    <div className="pt-4 flex gap-4 justify-center">
      <Button
        type="submit"
        variant={"default"}
        disabled={isSubmitting}
      >
        {icon && !isSubmitting && (
          <span className="mr-2">{icon}</span>
        )}
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {submittingText}
          </>
        ) : (
          submitButtonText
        )}
      </Button>

      {onCancel && (
        <Button
          type="button"
          variant={"delete"}
          className="w-2/4"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <Ban className="h-4 w-4 mr-2" />
          {cancelButtonText}
        </Button>
      )}
    </div>
  );
}