import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Button } from "@/core/presentation/components/base/ui/button";
import { Calendar } from "@/core/presentation/components/base/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/core/presentation/components/base/ui/popover";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";

export type FormDateSelectorProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  FieldIcon?: LucideIcon;
  required?: boolean;
  className?: string;
  allowFutureDates?: boolean;
};

export default function FormDateSelector<T extends FieldValues>({
  control,
  name,
  label,
  description,
  FieldIcon,
  required,
  className,
  allowFutureDates,
}: FormDateSelectorProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const dateValue = (field.value as unknown) instanceof Date ? (field.value as unknown as Date) : null;
        return (
          <Field className={`w-full flex flex-col gap-1 ${className}`} data-invalid={fieldState.invalid}>
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

            {/* Input Container */}
            <div className="relative flex items-center">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id={field.name}
                    className={`w-full justify-between font-normal bg-input/40 focus:ring focus:ring-primary/50 ${
                      !dateValue && "text-muted-foreground"
                    } ${fieldState.error && "border border-destructive!"}`}
                  >
                    <p>{dateValue instanceof Date ? dateValue.toLocaleDateString() : "Select date"}</p>
                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" onPointerDownOutside={(e) => e.preventDefault()}>
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={dateValue ?? undefined}
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpen(false);
                    }}
                    disabled={(date) => date < new Date("1900-01-01") || (!allowFutureDates && date > new Date())}
                  />
                </PopoverContent>
              </Popover>
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
        );
      }}
    />
  );
}
