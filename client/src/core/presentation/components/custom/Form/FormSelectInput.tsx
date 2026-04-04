import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/presentation/components/base/ui/select";
import type { LucideIcon } from "lucide-react";
import type { SelectOption } from "@/core/presentation/types/select-option.types";

export type FormSelectInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  options: SelectOption[];
  FieldIcon?: LucideIcon;
  required?: boolean;
  disabled?: boolean;
};

export default function FormSelectInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder = "Select an option",
  options,
  FieldIcon,
  required,
  disabled,
}: FormSelectInputProps<T>) {
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
              <FieldLabel htmlFor={name} className="flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
              </FieldLabel>
            </div>
          )}

          {/* Select Input */}
          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={disabled}>
            <SelectTrigger id={name} className={`w-full h-10! ${fieldState.error ? "border-destructive!" : ""}`} aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reserved Space for Description/Error */}
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
