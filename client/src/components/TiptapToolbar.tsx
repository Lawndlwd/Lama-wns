/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import bold from "../assets/svg/bold.svg";
import italic from "../assets/svg/italic.svg";
import strike from "../assets/svg/strike.svg";
import code from "../assets/svg/code-37.svg";
import paragraph from "../assets/svg/paragraph.svg";
import ul from "../assets/svg/ul.svg";
import ol from "../assets/svg/ol.svg";
import codeBlock from "../assets/svg/code-block.svg";
import quote from "../assets/svg/quote-15.svg";
import hr from "../assets/svg/hr.svg";
import undo from "../assets/svg/undo.svg";
import redo from "../assets/svg/redo.svg";
import image from "../assets/svg/image.svg";
import video from "../assets/svg/video.svg";
import highlight from "../assets/svg/highlight.svg";
import left from "../assets/svg/left.svg";
import center from "../assets/svg/center.svg";
import right from "../assets/svg/right.svg";
import justify from "../assets/svg/align-justify.svg";
import link from "../assets/svg/link.svg";
import underline from "../assets/svg/underline.svg";

import fontColor from "../assets/svg/fontColor.svg";
import breakd from "../assets/svg/break.svg";
import { iframe } from "../utils/urlToembed";
// import "./styles.scss";

const MenuBar = ({ editor, id }: { editor: any; id?: string }): JSX.Element => {
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  if (!editor) {
    return <></>;
  }
  return (
    <div
      id={id}
      className=" flex flex-wrap  gap-x-3 gap-y-1 text-gray-900 rounded-lg px-2  bg-gray-50"
    >
      <img
        src={bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "bg-gray-300" : "bg-gray-50"
        } inline w-7 py-2 px-1`}
      />
      <img
        src={italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <img
        src={strike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <img
        src={code}
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`${
          editor.isActive("code") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <img
        src={paragraph}
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${
          editor.isActive("paragraph") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1 ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-300"
            : "bg-gray-50"
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1 ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-300"
            : "bg-gray-50"
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1 ${
          editor.isActive("heading", { level: 3 })
            ? "bg-gray-300"
            : "bg-gray-50"
        }`}
      >
        H3
      </button>
      <img
        src={ul}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <div>
        <label htmlFor="fileInput">
          <img id="icon" src={fontColor} className={` inline w-7 pt-2 `} />
        </label>
        <input
          id="fileInput"
          style={{ display: "none" }}
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.currentTarget.value).run()
          }
          value={editor.getAttributes("textStyle").color}
        />
      </div>
      <img
        src={ol}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <img
        src={codeBlock}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <img
        src={quote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1`}
      />
      <img
        src={hr}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={` inline  w-7 py-1 px-1 bg-gray-50`}
      />

      <img
        src={highlight}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`${
          editor.isActive("highlight") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-1 px-1 bg-gray-50`}
      />
      <img
        src={left}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-1 px-1 bg-gray-50`}
      />
      <img
        src={center}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`${
          editor.isActive({ textAlign: "center" })
            ? "bg-gray-300"
            : "bg-gray-50"
        } inline  w-7 py-1 px-1 bg-gray-50`}
      />
      <img
        src={right}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-1 px-1 bg-gray-50`}
      />
      <img
        src={justify}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`${
          editor.isActive({ textAlign: "justify" })
            ? "bg-gray-300"
            : "bg-gray-50"
        } inline  w-7 py-1 px-1 bg-gray-50`}
      />

      <img
        src={underline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${
          editor.isActive("underline") ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1 bg-gray-50`}
      />
      <img
        src={undo}
        onClick={() => editor.chain().focus().undo().run()}
        className={` inline  w-7 py-2 px-1 bg-gray-50`}
      />
      <img
        src={redo}
        onClick={() => editor.chain().focus().redo().run()}
        className={` inline  w-7 py-2 px-1 bg-gray-50`}
      />
      <img
        src={video}
        onClick={() => {
          const url = window.prompt("URL");

          if (url) {
            const regExp =
              /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            const vedioId = match && match[2].length === 11 ? match[2] : null;

            const iframeVersion = (vedioId && iframe(vedioId)) || url;
            editor.chain().focus().setIframe({ src: iframeVersion }).run();
          }
        }}
        className={` inline  w-7 py-2 px-1 bg-gray-50`}
      />
      <img
        src={image}
        onClick={addImage}
        className={` inline  w-7 py-2 px-1 bg-gray-50`}
      />
      <img
        src={link}
        onClick={setLink}
        className={`${
          editor.isActive({ textAlign: "link" }) ? "bg-gray-300" : "bg-gray-50"
        } inline  w-7 py-2 px-1 bg-gray-50`}
      />
      <img
        src={breakd}
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={` inline  w-7 py-2 px-1 bg-gray-50`}
      />
    </div>
  );
};
export default MenuBar;
