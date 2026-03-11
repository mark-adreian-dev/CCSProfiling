import { cn } from "@/core/presentation/lib/utils";
import { Spinner } from "../../base/ui/spinner";

interface SpinnerLoaderProps {
  message?: string;
  className?: string;
}

export default function SpinnerLoader({ message, className }: SpinnerLoaderProps) {
  return (
    <div className="w-full h-full flex items-center justify-center gap-4">
      <Spinner className={cn("text-primary w-20 h-20", className)} />
      {message && <p className="text-primary font-bold">{message}</p>}
    </div>
  );
}
