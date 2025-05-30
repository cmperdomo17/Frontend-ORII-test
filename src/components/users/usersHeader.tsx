"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import Title from "@/components/ui/typography/title";
import Link from "next/link";
import { UsersHeaderProps } from "@/types/userType";

export default function UsersHeader({
  title,
  description,
  onSearch,
  searchTerm,
  role,
}: UsersHeaderProps) {
  return (
    <>
      <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title title={title} />
          {description && (
            <p className="text-muted-foreground py-3">{description}</p>
          )}
        </div>
      </div>

      {onSearch && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar nombre o correo..."
              className="pl-10 w-full"
              onChange={(e) => onSearch(e.target.value)}
              value={searchTerm}
            />
          </div>

          <Link href={"/dashboard/users/create"}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {role === "SU" ? "Crear usuario" : "Crear enlace"}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
