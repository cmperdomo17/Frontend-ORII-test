"use client";

import * as React from "react";
import {
  Globe,
  Home,
  ChartColumnIncreasing,
  PlaneTakeoff,
  LucideIcon,
  X,
  UserCog,
} from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { SidebarTrigger, useSidebar } from "@/components/ui/navigation/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/navigation/sidebar";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";
import SkeletonLoader from "@/components/ui/skeletons/sidebar-skeleton";

interface NavSubItem {
  title: string;
  url: string;
  roles?: UserRole[];
}

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items: NavSubItem[];
  roles?: UserRole[];
}

const BASE_PATH = "/dashboard";

const data = {
  navMain: [
    {
      title: "Inicio",
      url: `${BASE_PATH}/home`,
      icon: Home,
      isActive: true,
      items: [{ title: "Acerca de ORII", url: `${BASE_PATH}/home` }],
      roles: ["SU", "ADMIN", "USER"],
    },
    {
      title: "Convenios",
      url: `${BASE_PATH}/agreements`,
      icon: Globe,
      items: [
        { title: "Listar convenios", url: `${BASE_PATH}/agreements` },
        { title: "Crear convenio", url: `${BASE_PATH}/agreements/create`, roles: ["ADMIN"] },
      ],
      roles: ["ADMIN", "USER"],
    },
    {
      title: "Movilidad",
      url: `${BASE_PATH}/movility`,
      icon: PlaneTakeoff,
      items: [
        { title: "Listar movilidades", url: `${BASE_PATH}/movility` },
        { title: "Crear movilidad", url: `${BASE_PATH}/movility/create` },
      ],
      roles: ["ADMIN", "USER"],
    },
    {
      title: "Estadisticas",
      url: `${BASE_PATH}/statistics`,
      icon: ChartColumnIncreasing,
      items: [{ title: "Gráficos", url: `${BASE_PATH}/statistics` }],
      roles: ["ADMIN", "USER"],
    },
    {
      title: "Gestión de usuarios",
      url: `${BASE_PATH}/users`,
      icon: UserCog,
      items: [{ title: "Registrar usuario", url: `${BASE_PATH}/users/create` }],
      roles: ["SU"],
    },
    {
      title: "Gestión de enlaces",
      url: `${BASE_PATH}/users`,
      icon: UserCog,
      items: [{ title: "Registrar enlace", url: `${BASE_PATH}/users/create` }],
      roles: ["ADMIN"],
    },
  ] as NavItem[],
};

export const AppSidebar = React.memo(function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const userSession = useAuthStore((state) => state.userSession);
  const role: UserRole = userSession?.role as UserRole;
  const { isMobile } = useSidebar();
  const { toggleSidebar } = useSidebar();

  const filteredNavMain = data.navMain
    .filter((item) => {
      // Filtrar los elementos principales según los roles
      return !item.roles || item.roles.includes(role);
    })
    .map((item) => {
      // Filtrar los subelementos (items) según los roles
      const filteredItems = item.items.filter(
        (subItem) => !subItem.roles || subItem.roles.includes(role)
      );
      return { ...item, items: filteredItems };
    });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-blueDark text-white p-4 items-start">
        <div className="flex justify-between w-full">
          <Image
            src={"/logos/ORII.webp"}
            alt="Logo"
            width={150}
            height={150}
            className="group-data-[collapsible=icon]:w-0 orii-logo"
            priority
          />
          {isMobile ? (
            <button onClick={toggleSidebar}>
              <X className="text-white size-4 hover:bg-transparent hover:text-white" />
            </button>
          ) : (
            <SidebarTrigger className="text-white size-4 hover:bg-transparent hover:text-white" />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-blueDark text-white pt-8">
        {!userSession ? (
          <SkeletonLoader variant="main" count={4} />
        ) : (
          <NavMain items={filteredNavMain} />
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
});
