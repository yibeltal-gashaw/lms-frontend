import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import "@/components/ui/rich-text-editor.css";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function RichTextEditor({ value, onChange, placeholder, className, ...props }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[120px] p-3",
      },
    },
  });

  // Sync editor content when value prop changes externally
  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("rich-text-editor-wrapper border border-input rounded-md", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-input bg-muted/50 rounded-t-md">
        {/* Headers */}
        <div className="flex items-center gap-1 border-r border-input pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("heading", { level: 1 }) && "bg-primary text-primary-foreground"
            )}
          >
            H1
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("heading", { level: 2 }) && "bg-primary text-primary-foreground"
            )}
          >
            H2
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("heading", { level: 3 }) && "bg-primary text-primary-foreground"
            )}
          >
            H3
          </Button>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-input pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("bold") && "bg-primary text-primary-foreground"
            )}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("italic") && "bg-primary text-primary-foreground"
            )}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("strike") && "bg-primary text-primary-foreground"
            )}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-input pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("bulletList") && "bg-primary text-primary-foreground"
            )}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("orderedList") && "bg-primary text-primary-foreground"
            )}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Block Elements */}
        <div className="flex items-center gap-1 border-r border-input pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("blockquote") && "bg-primary text-primary-foreground"
            )}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive("codeBlock") && "bg-primary text-primary-foreground"
            )}
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-input pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive({ textAlign: "left" }) && "bg-primary text-primary-foreground"
            )}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive({ textAlign: "center" }) && "bg-primary text-primary-foreground"
            )}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={cn(
              "h-7 w-7 p-0",
              editor.isActive({ textAlign: "right" }) && "bg-primary text-primary-foreground"
            )}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Link */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={cn(
            "h-7 w-7 p-0",
            editor.isActive("link") && "bg-primary text-primary-foreground"
          )}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1 border-l border-input pl-2 ml-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-7 w-7 p-0"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-7 w-7 p-0"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-background rounded-b-md">
        <EditorContent 
          editor={editor} 
          data-placeholder={placeholder}
          {...props} 
        />
      </div>
    </div>
  );
}
