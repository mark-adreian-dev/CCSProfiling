import { Button } from "@/core/presentation/components/base/ui/button";
import { useForm } from "react-hook-form";
import {
  LoginRequestSchema,
  type LoginRequest,
} from "@/core/domain/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/core/presentation/components/custom/Form/Form";
import { useCSRFTokenQuery, useLoginMutation } from "@/core/hooks/auth.hooks";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { LockIcon, UserCircleIcon } from "lucide-react";

export function LoginForm() {
  useCSRFTokenQuery();
  const { mutateAsync: login, isPending: isLoggingIn } = useLoginMutation();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      identification_id: "",
      password: "",
    },
    mode: "all",
  });

  const { isDirty } = form.formState;

  const handleSubmit = async (values: LoginRequest) => {
    const credentials = LoginRequestSchema.parse(values);
    if (credentials) {
      await login(credentials);
    }
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className="grid gap-10">
        <div className="flex flex-col items-center gap-0 text-center">
          <h1 className="text-xl font-bold">Login</h1>
          <p className="text-muted-foreground">Login to your account</p>
        </div>
        <div className="grid gap-6">
          <FormTextInput
            FieldIcon={UserCircleIcon}
            formInstance={form}
            name={"identification_id"}
            label={"User ID"}
            type={"text"}
          />
          <FormTextInput
            FieldIcon={LockIcon}
            formInstance={form}
            name={"password"}
            label={"Password"}
            type={"password"}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoggingIn || !isDirty}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
