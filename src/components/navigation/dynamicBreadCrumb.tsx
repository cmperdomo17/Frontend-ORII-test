"use client";

import { usePathname } from "next/navigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/navigation/breadcrumb";
import Link from "next/link";
import { routeList } from "@/components/navigation/routeList";
import { JSX } from "react";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";

export default function DynamicBreadCrumb() {
  const userSession = useAuthStore((state) => state.userSession);
  const role: UserRole = (userSession?.role as UserRole) || "USER";

  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "dashboard" && segment !== "orii-front");

  const breadcrumbItems: JSX.Element[] = [];

  const isHomePage = pathname === "/dashboard/home/";

  if (!isHomePage) {
    breadcrumbItems.push(
      <BreadcrumbItem key="/home">
        <BreadcrumbLink asChild>
          <Link href="/dashboard/home">
            {routeList["/dashboard/home"] || "Inicio"}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
    if (segments.length > 0) {
      breadcrumbItems.push(<BreadcrumbSeparator key="sep-home" />);
    }
  }

  if (isHomePage && segments.length === 1 && segments[0] === "home") {
    breadcrumbItems.push(
      <BreadcrumbItem key="/home">
        <BreadcrumbPage>
          {routeList["/dashboard/home"] || "Inicio"}
        </BreadcrumbPage>
      </BreadcrumbItem>
    );
    return <>{breadcrumbItems}</>;
  }

  segments.forEach((segment, index) => {
    const displaySegments = segments.slice(0, index + 1);
    const navigationPath = `/dashboard/${displaySegments.join("/")}`;
    let label = routeList[navigationPath] || decodeURIComponent(segment);

    if (role !== "SU" && segment === "users") {
      label = "Gestión de enlaces";
    } else if (role !== "SU" && segments[index - 1] == "users" && segment === "create") {
      label = "Registrar enlace";
    }

    const isLast = index === segments.length - 1;

    breadcrumbItems.push(
      <BreadcrumbItem key={navigationPath}>
        {isLast ? (
          <BreadcrumbPage>{label}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={navigationPath}>{label}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );

    if (!isLast) {
      breadcrumbItems.push(
        <BreadcrumbSeparator key={`sep-${navigationPath}`} />
      );
    }
  });

  return <>{breadcrumbItems}</>;
}