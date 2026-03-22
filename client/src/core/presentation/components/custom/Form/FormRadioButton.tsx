import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { RadioGroup, RadioGroupItem } from "@/core/presentation/components/base/ui/radio-group";
import { Label } from "@/core/presentation/components/base/ui/label";
import type { LucideIcon } from "lucide-react";
import type { RadioOption } from "@/core/presentation/types/radio-option.types";

export type FormRadioButtonProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  FieldIcon?: LucideIcon;
  options: RadioOption[];
  required?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export default function FormRadioButton<T extends FieldValues>({
  control,
  name,
  label,
  description,
  FieldIcon,
  options,
  required,
  orientation = "horizontal",
  className,
}: FormRadioButtonProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={`w-fit flex flex-col gap-1 ${className}`} data-invalid={fieldState.invalid}>
          {/* Label Section */}
          {label && (
            <div className="flex items-center gap-2 h-6">
              {FieldIcon && <FieldIcon className="w-4 h-4 text-muted-foreground" />}
              <FieldLabel htmlFor={field.name} className="flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
              </FieldLabel>
            </div>
          )}

          {/* Radio Group Container */}
          <div className="flex items-center min-h-10">
            <RadioGroup
              value={(field.value as string) ?? ""}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              className={`flex ${orientation === "horizontal" ? "flex-row items-center gap-6" : "flex-col gap-3"}`}
            >
              {options.map((option) => {
                const optionId = `${field.name}-${option.value}`;
                return (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={optionId} />
                    <Label
                      htmlFor={optionId}
                      className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Reserved Error Space */}
          <div className="min-h-5 mt-0.5">
            {fieldState.invalid ? (
              <FieldError className="text-[11px] leading-tight font-medium text-destructive transition-all">{fieldState.error?.message}</FieldError>
            ) : (
              description && <FieldDescription className="text-[11px] leading-tight">{description}</FieldDescription>
            )}
          </div>
        </Field>
      )}
    />
  );
}
