import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { $getSelection, $isRangeSelection, $getRoot } from "lexical";
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, UNDO_COMMAND, FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, INSERT_CHECK_LIST_COMMAND, ListItemNode, ListNode } from "@lexical/list";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $createHeadingNode, HeadingNode, QuoteNode, type HeadingTagType } from "@lexical/rich-text";
import { $createCodeNode, CodeNode } from "@lexical/code";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/core/presentation/components/base/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/presentation/components/base/ui/select";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/core/presentation/components/base/ui/field";
import { cn } from "@/core/presentation/lib/utils";

import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  type LucideIcon,
  Heading1,
  Heading2,
  Heading3,
  TextInitial,
} from "lucide-react";
import { Separator } from "../../base/ui/separator";
import { ScrollArea } from "../../base/ui/scroll-area";

export type FormRichTextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  FieldIcon?: LucideIcon;
  className?: string;
  placeholder: string;
  onValueChange: (value: { html: string; text: string }) => void;
};

const theme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    code: "bg-muted p-1 rounded",
  },
  paragraph: "mb-2 text-base leading-relaxed text-primary-foreground/70",
  heading: {
    h1: "text-3xl font-bold tracking-tight mb-4 mt-2",
    h2: "text-2xl font-semibold tracking-tight mb-3 mt-2",
    h3: "text-xl font-medium mb-2 mt-1",
  },

  list: {
    ul: "list-disc list-inside my-1",
    ol: "list-decimal list-inside my-1",
    listitem: "editor_ListItem focus-within:ring-0 outline-none focus:outline-none mb-2 text-primary-foreground/70",
    listitemChecked: "editor__listItemChecked",
    listitemUnchecked: "editor__listItemUnchecked",
    nested: {
      listitem: "editor_ListItemNested",
    },
  },
};

function onError(error: Error) {
  console.error(error);
}

export default function FormRichTextInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  FieldIcon,
  className,
  placeholder,
  onValueChange,
}: FormRichTextInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const initialConfig = {
          namespace: "FormRichText",
          theme,
          onError,
          nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode],
        };

        return (
          <Field className="w-full flex flex-col gap-1" data-invalid={fieldState.invalid}>
            {/* Label */}
            {label && (
              <div className="flex items-center gap-2 h-6">
                {FieldIcon && <FieldIcon className="w-4 h-4 text-muted-foreground" />}
                <FieldLabel className="flex items-center gap-1">{label}</FieldLabel>
              </div>
            )}

            {/* Editor */}
            <div
              className={cn(
                "relative flex flex-col rounded-md border bg-background text-sm overflow-hidden",
                "focus-within:ring-1 focus-within:ring-primary/50 focus-within:ring-offset-0 bg-input/40 hover:bg-input",
                fieldState.invalid && "border-destructive"
              )}
            >
              <LexicalComposer initialConfig={initialConfig}>
                <RichTextToolbar />
                <SetEditorStatePlugin value={field.value} />
                <ScrollArea className={cn("relative h-full", className)}>
                  <div className="h-full w-full">
                    <RichTextPlugin
                      contentEditable={
                        <ContentEditable
                          className="outline-none h-full p-4 relative  transition-colors"
                          placeholder={<div className="absolute top-0 text-muted-foreground p-4">{placeholder}</div>}
                          aria-placeholder={placeholder}
                        />
                      }
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                  </div>
                </ScrollArea>

                <HistoryPlugin />
                <AutoFocusPlugin />
                <ListPlugin />
                <CheckListPlugin />
                <OnChangePlugin
                  onChange={(editorState, editor) => {
                    editorState.read(() => {
                      const html = $generateHtmlFromNodes(editor);
                      const text = $getRoot()
                        .getTextContent()
                        .replace(/[\n\r]+/g, " ")
                        .replace(/\s{2,}/g, " ")
                        .trim();
                      onValueChange({ html, text });
                    });
                  }}
                />
              </LexicalComposer>
            </div>

            {/* Error / Description */}
            <div className="min-h-5 mt-0.5">
              {fieldState.invalid ? (
                <FieldError className="text-[11px] leading-tight font-medium text-destructive">{fieldState.error?.message}</FieldError>
              ) : (
                description && <FieldDescription className="text-[11px] leading-tight text-muted-foreground">{description}</FieldDescription>
              )}
            </div>
          </Field>
        );
      }}
    />
  );
}

function RichTextToolbar() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [elementFormat, setElementFormat] = useState("left");

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      const node = selection.anchor.getNode();
      const element = node.getTopLevelElement();
      if (element !== null) {
        setElementFormat(element.getFormatType() || "left");
      }
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => updateToolbar());
    });
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-background sticky top-0 z-10">
      {/* History Group */}
      <div className="flex items-center">
        <Button type="button" variant="icon" size="icon" disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="icon" size="icon" disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Block Formatting Select */}
      <Select
        defaultValue="p"
        onValueChange={(value) => {
          if (value.startsWith("h")) formatHeading(value as HeadingTagType);
          if (value === "ul") editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          if (value === "ol") editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          if (value === "check") editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
          if (value === "code")
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) $setBlocksType(selection, () => $createCodeNode());
            });
        }}
      >
        <SelectTrigger className="w-40 h-8 text-xs">
          <SelectValue placeholder="Select text style" />
        </SelectTrigger>
        <SelectContent className="w-40">
          <SelectItem value="p">
            <span className="flex items-center gap-2">
              <TextInitial className="h-4 w-4" /> Normal Text
            </span>
          </SelectItem>
          <SelectItem value="h1">
            <span className="flex items-center gap-2">
              <Heading1 className="h-4 w-4" /> Heading 1
            </span>
          </SelectItem>
          <SelectItem value="h2">
            <span className="flex items-center gap-2">
              <Heading2 className="h-4 w-4" /> Heading 2
            </span>
          </SelectItem>
          <SelectItem value="h3">
            <span className="flex items-center gap-2">
              <Heading3 className="h-4 w-4" /> Heading 3
            </span>
          </SelectItem>
          <SelectItem value="ul">
            <span className="flex items-center gap-2">
              <List className="h-4 w-4" /> Bullet List
            </span>
          </SelectItem>
          <SelectItem value="ol">
            <span className="flex items-center gap-2">
              <ListOrdered className="h-4 w-4" /> Numbered List
            </span>
          </SelectItem>
          <SelectItem value="check">
            <span className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" /> Checklist
            </span>
          </SelectItem>
          <SelectItem value="code">
            <span className="flex items-center gap-2">
              <Code className="h-4 w-4" /> Code Block
            </span>
          </SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Inline Formatting */}
      <div className="flex items-center gap-1">
        <Button
          className={`${isBold && "bg-primary"}`}
          type="button"
          variant="icon"
          size="icon"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          className={`${isItalic && "bg-primary"}`}
          type="button"
          variant="icon"
          size="icon"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          className={`${isUnderline && "bg-primary"}`}
          type="button"
          variant="icon"
          size="icon"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Alignment */}
      <div className="flex items-center gap-1">
        <Button
          className={`${elementFormat === "left" && "bg-primary"}`}
          type="button"
          variant="icon"
          size="icon"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          className={`${elementFormat === "center" && "bg-primary"}`}
          type="button"
          variant="icon"
          size="icon"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          className={`${elementFormat === "right" && "bg-primary"}`}
          type="button"
          variant="icon"
          size="icon"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          className={`${elementFormat === "justify" && "bg-primary"}`}
          type="button"
          variant="icon"
          size="icon"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-1 h-6" />
    </div>
  );
}

export function SetEditorStatePlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!value) return;

    editor.update(() => {
      const currentHtml = $generateHtmlFromNodes(editor);

      // ✅ Prevent unnecessary updates (THIS FIXES CURSOR ISSUE)
      if (currentHtml === value && isInitialized.current) {
        return;
      }

      const parser = new DOMParser();
      const dom = parser.parseFromString(value, "text/html");

      const nodes = $generateNodesFromDOM(editor, dom);

      const root = $getRoot();
      root.clear();
      root.append(...nodes);

      isInitialized.current = true;
    });
  }, [value, editor]);

  return null;
}
