import { toast } from "sonner";
import axios from "axios";
import type { AuthErrorDTO } from "../infrastructure/dto/auth.dto";

export const handleError = (error: unknown, toasterID: string) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = (error.response?.data as AuthErrorDTO)?.message;
    const finalMessage =
      serverMessage || error.message || "An unexpected error occurred";
    toast.error(finalMessage, {
      id: toasterID,
    });
  } else {
    toast.error("A unexpected error occurred.");
  }
};
