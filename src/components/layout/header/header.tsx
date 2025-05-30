import DynamicBreadCrumb from "@/components/navigation/dynamicBreadCrumb";
import { Label } from "@/components/ui/typography/label";
import {
    Breadcrumb,
    BreadcrumbList,
} from "@/components/ui/navigation/breadcrumb";
import { useAuthStore } from "@/store/auth";
import SkeletonLoader from "@/components/ui/skeletons/sidebar-skeleton";
import { NavUser } from "@/components/sidebar/nav-user";
import { SidebarTrigger } from "@/components/ui/navigation/sidebar";
import { useSidebar } from "@/components/ui/navigation/sidebar";

export default function Header() {
    const userSession = useAuthStore((state) => state.userSession);
    const { isMobile } = useSidebar()

    const user = userSession ? {
        name: `${userSession.name || ""} ${userSession.lastname || ""}`,
        email: userSession.sub || "",
        avatar: "/img/user.webp"
    } : {
        name: "",
        email: "",
        avatar: ""
    };

    return (
        <>
            <header className="flex flex-col pt-1">
                <div className="flex items-center justify-between border-b-2 border-black/20 w-full">
                    {isMobile ? (
                        <SidebarTrigger className="text-blue size-4 hover:bg-transparent" />
                    ) :
                        <Label className="py-4">
                            Oficina de Relaciones Interinstitucionales e Internacionales
                        </Label>
                    }

                    <div className="w-[25%] flex items-center">
                        {!userSession ? (
                            <SkeletonLoader variant="user" count={1} />
                        ) : (
                            <NavUser user={user} />
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <Breadcrumb className="py-4">
                        <BreadcrumbList>
                            <DynamicBreadCrumb />
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
        </>
    );
}