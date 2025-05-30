import Background from "@/components/auth/layout/background";
import MultiColorBar from "@/components/ui/layout/multi-color-bar";
import FooterInfo from "@/components/layout/footer/footerInfo";
import ChangePasswordPage from "@/components/auth/change-password/changePassword";

export default function ChangePassword() {
    return (
        <>
            <div className="flex gap-2 w-full h-full md:h-screen">
                <ChangePasswordPage />
                <Background />
            </div>
            <MultiColorBar />
            <FooterInfo />
        </>
    );
}