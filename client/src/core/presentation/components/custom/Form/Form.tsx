import type {
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
}

export default function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
}: FormProps<T>) {
  return <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>;
}
