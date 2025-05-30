import { Movility } from "@/types/movilityType";
import { documentTypeDict } from "@/utils/movilityUtils";
import { Button } from "@/components/ui/buttons/button";
import { Pencil, Eye } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";
import { Checkbox } from "../ui/form/checkbox";

interface MovilityTableProps {
    movilities: Movility[];
    selectedMovilities: number[];
    filteredMovilities: Movility[];
    handleSelectMovility: (id: number) => void;
    openViewModal: (movility: Movility) => void;
    openEditModal: (movility: Movility) => void;
}

const MovilityTable = ({
    movilities,
    selectedMovilities,
    filteredMovilities,
    handleSelectMovility,
    openViewModal,
    openEditModal,
}: MovilityTableProps) => {

    // Obtener el rol del usuario
    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = userSession?.role as UserRole;

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[800px] border rounded-lg shadow-sm">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-muted">
                        <tr>
                            {role === "ADMIN" && (
                                <th className="px-4 py-3 text-center font-bold text-primary min-w-[50px]"></th>
                            )}
                            <th className="px-4 py-3 text-left font-bold text-primary">Nombre</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Tipo de documento</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Evento</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Fecha de inicio</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Fecha fin</th>
                            <th className="px-4 py-3 text-left font-bold text-primary">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {movilities.length === 0 || filteredMovilities.length === 0 ? (
                            <tr>
                                <td colSpan={role === "ADMIN" ? 7 : 6} className="px-4 py-3 text-center text-muted-foreground">
                                    No se encontraron movilidades
                                </td>
                            </tr>
                        ) : (
                            movilities.map((mob) => (
                                <tr key={mob.id} className="hover:bg-muted/50">
                                    {role === "ADMIN" && (
                                        <td className="px-4 py-3 text-center align-middle">
                                            <Checkbox
                                                checked={selectedMovilities.includes(mob.id)}
                                                onCheckedChange={() => handleSelectMovility(mob.id)}
                                                className="size-5 border-blueDark/50 text-blue 
                                                transition-colors cursor-pointer hover:border-blue"
                                            />
                                        </td>
                                    )}
                                    <td className="px-4 py-3">{mob.person.firstName}</td>
                                    <td className="px-4 py-3">
                                        {documentTypeDict[mob.person.identificationType.trim().toUpperCase()] || mob.person.identificationType}
                                    </td>
                                    <td className="px-4 py-3">{mob.event.description}</td>
                                    <td className="px-4 py-3">{mob.entryDate}</td>
                                    <td className="px-4 py-3">{mob.exitDate}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={() => openViewModal(mob)}
                                                variant="outline"
                                                size="sm"
                                                className="bg-blueLight text-white hover:bg-blue hover:text-white transition-colors border-none"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                onClick={() => openEditModal(mob)}
                                                variant="outline"
                                                size="sm"
                                                className="bg-accesibility/40 text-accesibility hover:text-white hover:bg-accesibility border-none"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovilityTable;
