import Background from "@/components/auth/layout/background";
import MultiColorBar from "@/components/ui/layout/multi-color-bar";
import FooterInfo from "@/components/layout/footer/footerInfo";
import ForgotPasswordPage from "@/components/auth/forgot-password/forgotPassword";

export default function ForgotPassword() {
    return (
        <>
            <div className="flex gap-2 w-full h-full md:h-screen">
                <ForgotPasswordPage />
                <Background />
            </div>
            <MultiColorBar />
            <FooterInfo />
        </>
    );
}