import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useState, type InputHTMLAttributes } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Input } from "@/core/presentation/components/base/ui/input";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

// Replaced 'any' with unknown for safer loosening of strictness
export type FormTextInputProps<T extends FieldValues> = {
  control: Control<T>;
  FieldIcon?: LucideIcon;
  name: Path<T>;
  label?: string;
  description?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export default function FormTextInput<T extends FieldValues>({ control, name, label, description, FieldIcon, ...inputProps }: FormTextInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = inputProps.type === "password";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="w-full flex flex-col gap-1" data-invalid={fieldState.invalid}>
          {/* Label Section */}
          {label && (
            <div className="flex items-center gap-2 h-6">
              {FieldIcon && <FieldIcon className="w-4 h-4 text-muted-foreground" />}
              <FieldLabel htmlFor={field.name} className="flex items-center gap-1">
                {label}
                {inputProps.required && <span className="text-destructive">*</span>}
              </FieldLabel>
            </div>
          )}

          {/* Input Container */}
          <div className={`relative borderflex items-center rounded-md overflow-hidden`}>
            <Input
              {...field}
              {...inputProps}
              id={field.name}
              aria-invalid={fieldState.invalid}
              className={`w-full pr-10 ${fieldState.error && "border-destructive!"} hover:bg-input!`}
              type={isPasswordField ? (isPasswordVisible ? "text" : "password") : inputProps.type}
            />

            {/* Password Toggle Logic */}
            {isPasswordField && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Reserved Error Space */}
          <div className="min-h-5 mt-0.5">
            {description && !fieldState.error && <FieldDescription className="text-[11px] leading-tight">{description}</FieldDescription>}

            {fieldState.error && (
              <FieldError className="text-[11px] leading-tight font-medium text-destructive">{fieldState.error.message}</FieldError>
            )}
          </div>
        </Field>
      )}
    />
  );
}
