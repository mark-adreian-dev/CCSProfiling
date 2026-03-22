import { toast } from "sonner";
import axios from "axios";

export const handleError = (error: unknown, toasterID: string) => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data;

    console.log("Axios Error:", error.response);

    const serverMessage = response?.message ?? "Request failed";

    const validationErrors = response?.errors;
    let formattedErrors = "";

    if (validationErrors) {
      formattedErrors = Object.entries(validationErrors)
        .map(([, messages]) => {
          return `${(messages as string[]).join(", ")}`;
        })
        .join("\n");
    }

    const finalMessage = formattedErrors ? `${formattedErrors}` : serverMessage;

    toast.error(finalMessage, {
      id: toasterID,
    });

    return;
  }

  toast.error("An unexpected error occurred.");
};