import { Controller } from "react-hook-form";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { useState, type InputHTMLAttributes } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/core/presentation/components/base/ui/field";
import { Input } from "@/core/presentation/components/base/ui/input";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

export type FormTextInputProps<T extends FieldValues> = {
  formInstance: UseFormReturn<T>;
  FieldIcon?: LucideIcon;
  name: Path<T>;
  label?: string;
  description?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export default function FormTextInput<T extends FieldValues>({
  formInstance,
  name,
  label,
  description,
  FieldIcon,
  ...inputProps
}: FormTextInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const Icon = FieldIcon;
  const isPasswordField = inputProps.type === "password";

  return (
    <Controller
      name={name}
      control={formInstance.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <div className="flex items-center gap-2 mb-1">
              {Icon && <Icon className="w-4 h-4" />}
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            </div>
          )}

          <div className="relative flex items-center border border-primary/50 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <Input
              {...field}
              {...inputProps}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="border-none focus-visible:ring-0 w-full pr-10"
              type={
                isPasswordField
                  ? isPasswordVisible
                    ? "text"
                    : "password"
                  : inputProps.type
              }
            />

            {isPasswordField && (
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer pr-3"
                tabIndex={-1}
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>

          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
