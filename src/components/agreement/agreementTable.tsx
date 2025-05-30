"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { Badge } from "@/components/ui/typography/badge";
import { AgreementProps, AgreementTableProps } from "@/types/agreementType";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import React from "react";
import { deleteAgreementAction } from "@/actions/agreementAction";
import { toast } from "sonner";
import AgreementForm from "./agreementForm";
import Title from "@/components/ui/typography/title";
import { COUNTRIES } from "@/lib/countries";

export default function AgreementTable({
  agreements,
  isLoading,
  emptyMessage,
  columns,
  role,
  reloadAgreements,
}: AgreementTableProps) {
  const [selectedAgreement, setSelectedAgreement] =
    React.useState<AgreementProps | null>(null);

  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD,
  } = useDisclosure();
  const {
    isOpen: isOpenU,
    onOpen: onOpenU,
    onOpenChange: onOpenChangeU,
    onClose: onCloseU,
  } = useDisclosure();

  const handleOpenDeleteModal = (agreement: AgreementProps) => {
    setSelectedAgreement(agreement);
    onOpenD();
  };

  const handleOpenEditModal = (agreement: AgreementProps) => {
    setSelectedAgreement(agreement);
    onOpenU();
  };

  const handleDelete = async () => {
    if (!selectedAgreement || !selectedAgreement.agreementId) {
      toast.error("No se ha seleccionado un convenio para eliminar");
      return;
    }

    try {
      const result = await deleteAgreementAction(
        selectedAgreement.agreementId.toString()
      );
      if (result.success) {
        toast.success("Convenio eliminado exitosamente");
        onCloseD();
        if (reloadAgreements) {
          reloadAgreements();
        }
      }
    } catch (error) {
      console.error("Error al eliminar el convenio:", error);
      toast.error("Ocurrió un error al eliminar el convenio");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>
        );
      case "INACTIVE":
        return <Badge className="bg-red-500 hover:bg-red-600">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-blue" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue"
              >
                {column.header}
              </th>
            ))}
            {role === "ADMIN" ? (
              <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
                Acciones
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y">
          {agreements.length > 0 ? (
            agreements.map((agreement) => (
              <tr key={agreement.agreementId} className="hover:bg-muted/50">
                {columns.map((column) => (
                  <td
                    key={`${agreement.agreementId}-${String(column.key)}`}
                    className={
                      column.key === "description"
                        ? "px-4 py-3 max-w-xs truncate"
                        : "px-4 py-3"
                    }
                    title={
                      column.key === "description"
                        ? String(agreement.description)
                        : undefined
                    }
                  >
                    {column.key === "status" ? (
                      getStatusBadge(String(agreement.status))
                    ) : column.key === "country" ? (
                      <span className="flex items-center">
                        {(() => {
                          const countryName = String(agreement[column.key]);
                          const countryObj = COUNTRIES.find(
                            (option) => option.title === countryName
                          );
                          return countryObj ? (
                            <>
                              <img
                                alt={countryObj.value}
                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryObj.value}.svg`}
                                className="inline h-4 mr-2"
                              />
                              {countryName}
                            </>
                          ) : (
                            countryName
                          );
                        })()}
                      </span>
                    ) : (
                      String(agreement[column.key])
                    )}
                  </td>
                ))}
                {role === "ADMIN" ? (
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleOpenEditModal(agreement)}
                        variant="outline"
                        size="sm"
                        className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        onClick={() => handleOpenDeleteModal(agreement)}
                        variant="outline"
                        size="sm"
                        className="bg-redLight/40 text-redLight hover:text-white hover:bg-redLight border-none"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-3 text-center"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        className="pb-2 max-h-[90vh]"
        size="3xl"
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        isOpen={isOpenU}
        onClose={onCloseU}
        onOpenChange={onOpenChangeU}
        autoFocus={false}
        scrollBehavior="inside"
      >
        <ModalContent className="px-4">
          {() => (
            <>
              <ModalHeader>
                <Title title="Editar convenio" />
              </ModalHeader>
              <ModalBody>
                {selectedAgreement && (
                  <AgreementForm
                    agreement={selectedAgreement}
                    onCloseU={onCloseU}
                    reloadAgreements={reloadAgreements}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenD} onOpenChange={onOpenChangeD}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar convenio
              </ModalHeader>
              <ModalBody>
                {selectedAgreement && (
                  <p>
                    ¿Está seguro que desea eliminar el convenio{" "}
                    <strong>{selectedAgreement.agreementNumber}</strong>?
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="secondaryWithoutHover" onClick={onCloseD}>
                  Cancelar
                </Button>
                <Button variant="delete" onClick={handleDelete}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
