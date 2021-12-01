/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/button-has-type */
import React from "react";
import {
  ReactNodeViewRenderer,
  useEditor,
  BubbleMenu,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import LinkTiptap from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { v4 } from "uuid";
import Iframe from "./Iframe";
import MenuBar from "./TiptapToolbar";
import CodeBlockComponent from "./CodeBlockComponent";

const { lowlight } = require("lowlight");

const CustomDocument = Document.extend({
  content: "heading block*",
});

const Tiptap = ({
  editable,
  content,
  onChange,
  stepTitle,
  onStepTitleChange,
}: {
  editable: boolean;
  content: any;
  onChange?: any;
  stepTitle?: any;
  onStepTitleChange?: any;
}): JSX.Element => {
  const id = v4();
  const editor = useEditor({
    editable,
    extensions: [
      CustomDocument,
      StarterKit,
      LinkTiptap,
      Underline,
      Iframe,
      Image,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content,
    onUpdate(instance: any) {
      if (!editable) {
        instance.editor.commands.setContent(instance.editor.getJSON());
        onChange(instance.editor.getJSON());
      }
    },
  });
  React.useEffect(() => {
    if (content && editor) editor.commands.setContent(content, true);
  }, [content, editable, editor]);
  return (
    <div>
      {editable && (
        <div className="flex items-center gap-3">
          <div className="form-control">
            <input
              id="form-title"
              type="text"
              placeholder="Step Title"
              className="input input-primary input-bordered"
              value={stepTitle}
              onChange={onStepTitleChange}
            />
          </div>
          <div>
            {" "}
            <MenuBar id={id} editor={editor} />
          </div>
        </div>
      )}
      {editor && editable && (
        <BubbleMenu
          className="flex gap-2 bg-gray-600 rounded-lg"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-800 p-2 " : "p-2 "}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-800 p-2 " : "p-2 "}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-gray-800 p-2 " : "p-2 "}
          >
            Strike
          </button>
        </BubbleMenu>
      )}
      {/* {editor && editable && (
        <FloatingMenu
          className="flex gap-2 "
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )} */}

      <EditorContent
        editor={editor}
        className=" rounded-lg py-2 my-2 max-w-4xl mx-auto"
      />
    </div>
  );
};

export default Tiptap;
