import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { type TextareaHTMLAttributes } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Textarea } from "@/core/presentation/components/base/ui/textarea";
import { cn } from "@/core/presentation/lib/utils";
import { type LucideIcon } from "lucide-react";

export type FormTextAreaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  FieldIcon?: LucideIcon;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  description,
  FieldIcon,
  className,
  required,
  ...props
}: FormTextAreaProps<T>) {
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
                {required && <span className="text-destructive">*</span>}
              </FieldLabel>
            </div>
          )}

          {/* Textarea Container */}
          <Textarea
            {...field}
            {...props}
            id={field.name}
            value={field.value ?? ""}
            aria-invalid={fieldState.invalid}
            placeholder={props.placeholder ?? label}
            // stopPropagation prevents accidental sheet/modal closing while typing
            onKeyDown={(e) => {
              e.stopPropagation();
              props.onKeyDown?.(e);
            }}
            className={cn("min-h-20  focus-visible:ring-2 focus-visible:ring-primary bg-background resize-none", className)}
          />

          {/* Reserved Error Space (Consistency) */}
          <div className="min-h-5 mt-0.5">
            {fieldState.invalid ? (
              <FieldError className="text-[11px] leading-tight font-medium text-destructive transition-all">{fieldState.error?.message}</FieldError>
            ) : (
              description && <FieldDescription className="text-[11px] leading-tight text-muted-foreground">{description}</FieldDescription>
            )}
          </div>
        </Field>
      )}
    />
  );
}
