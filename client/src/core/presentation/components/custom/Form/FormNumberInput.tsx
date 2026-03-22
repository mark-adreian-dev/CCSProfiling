import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { type InputHTMLAttributes } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Input } from "@/core/presentation/components/base/ui/input";
import { Button } from "@/core/presentation/components/base/ui/button";
import { Minus, Plus, type LucideIcon } from "lucide-react";

export type FormNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  FieldIcon?: LucideIcon;
  name: Path<T>;
  label?: string;
  description?: string;
  step?: number;
  min?: number;
  max?: number;
  inputControls?: boolean;
  allowNegative?: boolean;
  allowZeroFirstCharacter?: boolean;
  allowDecimal?: boolean; // Fixed type definition
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type">;

export default function FormNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  FieldIcon,
  step = 1,
  min,
  max,
  className,
  inputControls = false,
  allowNegative = false,
  allowZeroFirstCharacter = false,
  allowDecimal = false,
  ...inputProps
}: FormNumberInputProps<T>) {
  const formatWithCommas = (value: string | number | undefined) => {
    if (value === undefined || value === "" || value === "-") return value?.toString() || "";
    if (allowZeroFirstCharacter) return value.toString();
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const updateValue = (delta: number) => {
          const current = Number(field.value) || 0;
          let next = current + delta;

          // If allowNegative is false, we must stay at or above 0
          if (!allowNegative) {
            next = Math.max(0, next);
          }

          // Only apply min if it was explicitly provided,
          // or if we aren't allowing negatives (where min defaults to 0)
          const effectiveMin = min !== undefined ? min : !allowNegative ? 0 : -Infinity;

          next = Math.max(effectiveMin, next);

          if (max !== undefined) {
            next = Math.min(max, next);
          }

          field.onChange(next);
        };
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let val = e.target.value.replace(/,/g, "");

          // 1. Handle starting with a dot -> convert to "0."
          if (allowDecimal && val === ".") {
            val = "0.";
          }

          // 2. Prevent negative sign if not allowed
          if (!allowNegative) {
            val = val.replace(/-/g, "");
          }

          // 3. Leading zero logic:
          if (!allowZeroFirstCharacter) {
            // If it starts with 0 and the next char isn't a dot, remove the 0
            if (val.startsWith("0") && val.length > 1 && val[1] !== ".") {
              val = val.replace(/^0+/, "");
            }
            // If it's just "0" and we aren't allowing decimals, clear it
            else if (val === "0" && !allowDecimal) {
              val = "";
            }
          }

          // 4. Regex Validation
          const decimalPart = allowDecimal ? "\\.?\\d*" : "";
          const negativePart = allowNegative ? "^-?" : "^";
          const regex = new RegExp(`${negativePart}\\d*${decimalPart}$`);

          if (val !== "" && val !== "-" && !regex.test(val)) return;

          // 5. State Update logic
          // If the value is a "partial" number (just "-" or ends in "."),
          // we MUST keep it as a string so the user can continue typing.
          if (val === "" || val === "-" || (allowDecimal && val.endsWith("."))) {
            field.onChange(val);
            return;
          }

          // 6. Final Number Processing
          const num = Number(val);
          if (!isNaN(num)) {
            let boundedValue: string | number = num;

            // Max Check
            if (max !== undefined && num > max) {
              boundedValue = max;
            }

            // Min Check (Fixed for TS)
            if (min !== undefined && num < min) {
              // Force to min if negatives aren't allowed or if it's a positive value below min
              if (!allowNegative || num >= 0) {
                boundedValue = min;
              }
            } else if (!allowNegative && num < 0) {
              // If allowNegative is false, the absolute floor is 0
              boundedValue = 0;
            }

            // Preserve the string in state for special cases (leading zero or negative sign)
            if ((allowZeroFirstCharacter && val.startsWith("0") && !val.includes(".")) || (allowNegative && val.startsWith("-"))) {
              field.onChange(val);
            } else {
              field.onChange(boundedValue);
            }
          }
        };

        return (
          <Field className="w-full flex flex-col gap-1" data-invalid={fieldState.invalid}>
            {label && (
              <div className="flex items-center gap-2 h-6">
                {FieldIcon && <FieldIcon className="w-4 h-4 text-muted-foreground" />}
                <FieldLabel htmlFor={field.name} className="flex items-center gap-1">
                  {label} {inputProps.required && <span className="text-destructive">*</span>}
                </FieldLabel>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className={`relative flex-1 flex items-center rounded-md overflow-hidden ${fieldState.error && "border border-destructive!"}`}>
                <Input
                  {...field}
                  {...inputProps}
                  id={field.name}
                  type="text"
                  inputMode={allowDecimal ? "decimal" : "numeric"}
                  value={formatWithCommas(field.value)}
                  onChange={handleInputChange}
                  aria-invalid={fieldState.invalid}
                  className={`${className} ${fieldState.error && "border-destructive!"} `}
                />
              </div>

              {inputControls && (
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={() => updateValue(-step)}
                    disabled={min !== undefined ? Number(field.value) <= min : !allowNegative && Number(field.value) <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={() => updateValue(step)}
                    disabled={max !== undefined && Number(field.value) >= max}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="min-h-5 mt-0.5">
              {description && !fieldState.error && <FieldDescription className="text-[11px] leading-tight">{description}</FieldDescription>}
              {fieldState.error && (
                <FieldError className="text-[11px] leading-tight font-medium text-destructive">{fieldState.error.message}</FieldError>
              )}
            </div>
          </Field>
        );
      }}
    />
  );
}
