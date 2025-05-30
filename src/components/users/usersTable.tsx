"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { Badge } from "@/components/ui/typography/badge";
import { UsersTableProps, UserData } from "@/types/userType";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import React from "react";
import { deleteUserAction } from "@/actions/userAction";
import { toast } from "sonner";
import UsersForm from "./usersForm";
import Title from "@/components/ui/typography/title";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/navigation/tooltip";
import { facultyDict } from "@/utils/movilityUtils";

export default function UsersTable({
  users,
  isLoading,
  emptyMessage,
  columns,
  reloadUsers,
  role
}: UsersTableProps) {
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);

  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onOpenChange: onOpenChangeD,
    onClose: onCloseD,
  } = useDisclosure(); // Modal de eliminar (D de Delete)
  const {
    isOpen: isOpenU,
    onOpen: onOpenU,
    onOpenChange: onOpenChangeU,
    onClose: onCloseU,
  } = useDisclosure(); // Modal de editar (U de Update)

  const handleOpenDeleteModal = (users: UserData) => {
    setSelectedUser(users);
    onOpenD();
  };

  const handleOpenEditModal = (users: UserData) => {
    setSelectedUser(users);
    onOpenU();
  };

  const handleDelete = async () => {
    if (!selectedUser || !selectedUser.userId) {
      toast.error("No se ha seleccionado un usuario para eliminar");
      return;
    }

    try {
      const result = await deleteUserAction(selectedUser.userId.toString());

      if (result.success) {
        toast.success("Usuario eliminado exitosamente");
        onCloseD();
        if (reloadUsers) {
          reloadUsers();
        }
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      toast.error("Ocurrió un error al eliminar el usuario");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-blue" />
      </div>
    );
  }

  const getEmailVerifiedBadge = (status: boolean) => {
    return status ? (
      <Badge className="bg-green-500 hover:bg-green-600">Sí</Badge>
    ) : (
      <Badge className="bg-redLight hover:bg-red">No</Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-blue/75 hover:bg-blue">ADMIN</Badge>;
      case "USER":
        return <Badge className="bg-green-500 hover:bg-green-700">ENLACE</Badge>;
      default:
        return null;
    }
  };

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
            <th className="whitespace-nowrap px-4 py-3 text-left font-bold text-blue">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.userId} className="hover:bg-muted/50">
                {columns.map((column) => (
                  <td
                    key={`${user.userId}-${String(column.key)}`}
                    className="px-4 py-3 text-start"
                  >
                    {column.key === "name" && String(user.name)}
                    {column.key === "lastName" && String(user.lastName)}
                    {column.key === "email" && String(user.email)}
                    {column.key === "emailVerified" &&
                      getEmailVerifiedBadge(user.emailVerified)}
                    {column.key === "role" &&
                      getRoleBadge(user.role)}
                    {column.key === "faculty" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-tertiary font-semibold cursor-pointer">
                              {user.faculty}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <>
                              {facultyDict[user.faculty ?? ""]}
                            </>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleOpenEditModal(user)}
                      variant="outline"
                      size="sm"
                      className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={() => handleOpenDeleteModal(user)}
                      variant="outline"
                      size="sm"
                      className="bg-redLight/40 text-redLight hover:text-white hover:bg-redLight border-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
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
                <Title title="Editar usuario" />
              </ModalHeader>
              <ModalBody>
                {selectedUser && (
                  <UsersForm
                    user={{
                      ...selectedUser,
                      faculty: selectedUser.faculty ?? "",
                    }}
                    onCloseU={onCloseU}
                    reloadUsers={reloadUsers}
                    role={role}
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
                Eliminar Usuario
              </ModalHeader>
              <ModalBody>
                {selectedUser && (
                  <p>
                    ¿Está seguro que desea eliminar a:{" "}
                    <strong className="text-blue">
                      {selectedUser.name + " " + selectedUser.lastName}
                    </strong>
                    ?
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
