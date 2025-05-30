"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import UsersTable from "@/components/users/usersTable";
import { useUsers } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { columns } from "@/config/userConfig";
import UsersHeader from "@/components/users/usersHeader";
import { useUsersFilters } from "@/hooks/useFilterUsers";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";
import { Loader2 } from "lucide-react";

export default function UsersPage() {
  const [isReady, setIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState("links");

  const userSession = useAuthStore((state) => state.userSession);

  const role: UserRole = (userSession?.role as UserRole) || "USER";

  const { isLoading, linksData, adminsData, reloadUsers } = useUsers();

  const { searchTerm, filteredLinks, filteredAdmins, handleSearch } =
    useUsersFilters(linksData, adminsData);

  useEffect(() => {
    if (userSession) {
      setActiveTab(role === "SU" ? "admins" : "links");
      setIsReady(true);
    }
  }, [userSession, role]);

  if (!isReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 pb-10">
      <UsersHeader
        title={role === "SU" ? "Usuarios" : "Enlaces"}
        description={
          role === "SU"
            ? "Aquí puedes ver y gestionar los usuarios de la aplicación."
            : "Aquí puedes ver y gestionar los enlaces de la aplicación."
        }
        onSearch={handleSearch}
        searchTerm={searchTerm}
        users={filteredAdmins.concat(filteredLinks)}
        role={role}
      />

      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList
          className={`grid ${role === "SU" ? "grid-cols-2" : "grid-cols-1"} w-full mb-6`}
        >
          {role === "SU" ? (
        <TabsTrigger value="admins">Administradores</TabsTrigger>
          ) : null}
          <TabsTrigger className="w-full" value="links">Enlaces</TabsTrigger>
        </TabsList>

        {role === "SU" ? (
          <TabsContent value="admins" className="space-y-4">
            <UsersTable
              users={filteredAdmins}
              isLoading={isLoading}
              emptyMessage="No se encontraron administradores"
              columns={columns.filter((column) => column.key !== "faculty")}
              reloadUsers={reloadUsers}
              role={role}
            />
          </TabsContent>
        ) : null}

        <TabsContent value="links" className="space-y-4">
          <UsersTable
            users={filteredLinks}
            isLoading={isLoading}
            emptyMessage="No se encontraron enlaces"
            columns={columns}
            reloadUsers={reloadUsers}
            role={role}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
