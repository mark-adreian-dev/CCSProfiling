import { Link, Outlet } from "react-router-dom";
import CCSLogo from "@/core/presentation/assets/ccs-logo.png";
import CCSBackground from "@/core/presentation/assets/auth-bg.jpg";
import { Toaster } from "@/core/presentation/components/base/ui/sonner";
import { TOASTER_CONFIG } from "@/core/config/toaster.config";
import { useIsMobile } from "@/core/presentation/hooks/use-mobile";
export default function AuthLayout() {
  const isMobile = useIsMobile();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-4 p-6 md:p-10 relative">
        <Toaster
          richColors
          position="top-center"
          closeButton
          style={
            !isMobile
              ? {
                  position: "absolute",
                  top: "2rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 50,
                }
              : {}
          }
          toastOptions={{
            closeButton: false,
            toasterId: TOASTER_CONFIG.AUTH,
          }}
        />
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-2xl w-fit">
            <Link to="#" className="flex flex-col items-center justify-center gap-4 font-medium mb-4">
              <div className="flex size-30 items-center justify-center rounded-md text-primary-foreground">
                <img src={CCSLogo} className="object-cover object-center" draggable="false" />
              </div>
            </Link>
            <div className="text-center mb-10">
              <p className="text-2xl font-bold">College of Computing Studies</p>
              <p className="text-balance text-lg text-muted-foreground">University of Cabuyao</p>
            </div>
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={CCSBackground}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
