import { useState, useRef, useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Camera, X, Check, type LucideIcon } from "lucide-react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { Button } from "@/core/presentation/components/base/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/core/presentation/components/base/ui/dialog";
import { Input } from "@/core/presentation/components/base/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";

export type FormImagePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  FieldIcon?: LucideIcon;
  aspectRatio?: number;
  required?: boolean;
};

export default function FormImagePicker<T extends FieldValues>({
  control,
  name,
  label,
  description,
  FieldIcon = Camera,
  aspectRatio = 1,
  required,
}: FormImagePickerProps<T>) {
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [isOpen, setIsOpen] = useState(false);

  // Use a local state specifically for the blob URL of NEWLY cropped files
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  // Watch the form value (could be a string URL from backend or a File object)
  const fieldValue = useWatch({ control, name });

  const preview = useMemo(() => {
    if (localPreview) return localPreview;
    if (typeof fieldValue === "string" && (fieldValue.startsWith("http") || fieldValue.startsWith("/"))) {
      return fieldValue;
    }
    return null;
  }, [fieldValue, localPreview]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const size = Math.min(width, height);
    const initialCrop = centerCrop(makeAspectCrop({ unit: "px", width: size }, aspectRatio, width, height), width, height);
    setCrop(initialCrop);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTempImage(url);
    setIsOpen(true);
  };

  const getCroppedFile = (image: HTMLImageElement, crop: Crop): Promise<File> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, canvas.width, canvas.height);
    }

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        resolve(new File([blob], "profile_picture.png", { type: "image/png" }));
      }, "image/png");
    });
  };

  const handleApplyCrop = async (onChange: (file: File | null) => void) => {
    if (!imgRef.current || !crop?.width || !crop?.height) return;

    const file = await getCroppedFile(imgRef.current, crop);
    const previewUrl = URL.createObjectURL(file);

    setLocalPreview(previewUrl);
    onChange(file);
    setTempImage(null);
    setIsOpen(false);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="w-fit flex flex-col gap-1" data-invalid={fieldState.invalid}>
          {label && (
            <div className="flex items-center gap-2 h-6">
              <FieldIcon className="w-4 h-4 text-muted-foreground" />
              <FieldLabel className="flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
              </FieldLabel>
            </div>
          )}

          <div
            className={`relative aspect-square w-70 border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-muted/30 overflow-hidden group ${
              fieldState.invalid ? "border-destructive" : "border-primary/30 hover:border-primary"
            }`}
          >
            {preview ? (
              <>
                <img src={preview} className="h-full w-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setLocalPreview(null);
                      field.onChange(null);
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </>
            ) : (
              <label className="flex flex-col items-center cursor-pointer p-4 w-full h-full justify-center">
                <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-xs text-center font-medium text-muted-foreground">Upload Image</span>
                <Input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onFileChange}
                  onClick={(e) => {
                    (e.target as HTMLInputElement).value = "";
                  }}
                />
              </label>
            )}
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-125 p-6 gap-6">
              <DialogHeader>
                <DialogTitle>Crop Image</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">Drag to reposition and resize the crop area.</DialogDescription>
              </DialogHeader>

              <div className="w-full bg-black rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                {tempImage && (
                  <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={aspectRatio}>
                    <img ref={imgRef} src={tempImage} onLoad={onImageLoad} className="max-h-100 object-contain" />
                  </ReactCrop>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setTempImage(null);
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={() => handleApplyCrop(field.onChange)}>
                  <Check className="w-4 h-4 mr-1" />
                  Crop
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="min-h-5 mt-0.5">
            {fieldState.invalid ? (
              <FieldError className="text-[11px]">{fieldState.error?.message}</FieldError>
            ) : (
              description && <FieldDescription className="text-[11px]">{description}</FieldDescription>
            )}
          </div>
        </Field>
      )}
    />
  );
}
