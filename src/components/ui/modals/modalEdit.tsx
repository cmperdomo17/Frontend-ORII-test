"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/modals/dialog";
import { Movility } from "@/types/movilityType";
import { MovilityForm } from "@/components/movility/movilityForm";
import { X } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { useState } from "react";
import { UnsavedChangesModal } from "@/components/ui/modals/unSavedChangesModal";
import Title from "@/components/ui/typography/title";

interface ModalEditProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedMovility: Movility) => void;
}

export default function ModalEdit({ movility, open, onClose, onUpdate }: ModalEditProps) {
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleCloseAttempt = () => {
    if (hasChanges) {
      setShowUnsavedChangesModal(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowUnsavedChangesModal(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseAttempt();
          }
        }}
      >
        <DialogContent
          className="max-w-2xl"
          onPointerDownOutside={(e) => {
            if (hasChanges) {
              e.preventDefault();
              handleCloseAttempt();
            } else {
              onClose();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (hasChanges) {
              e.preventDefault();
              handleCloseAttempt();
            } else {
              onClose();
            }
          }}
        >
          <div className="flex justify-between items-center">
            <DialogTitle>
              <Title title="Editar Movilidad" ></Title>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseAttempt}
              className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {movility && (
              <MovilityForm
                initialValues={movility}
                movility={movility}
                onClose={onClose}
                isEditing={true}
                onSuccess={(updatedData) => {
                  onUpdate(updatedData);
                  onClose();
                }}
                onFormChange={(isDirty) => setHasChanges(isDirty)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <UnsavedChangesModal
        isOpen={showUnsavedChangesModal}
        onClose={() => setShowUnsavedChangesModal(false)}
        onConfirm={handleConfirmClose}
      />
    </>
  );
}