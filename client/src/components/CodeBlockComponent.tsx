/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: any): JSX.Element => (
  <NodeViewWrapper className=" relative">
    <select
      className=" absolute right-2 top-2 text-gray-900 "
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={(event) => updateAttributes({ language: event.target.value })}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>

    <pre>
      <div className="flex gap-3 mb-5">
        <div className="bg-red-500 rounded-full w-3 h-3" />
        <div className="bg-gray-500 rounded-full w-3 h-3" />
        <div className="bg-green-500 rounded-full w-3 h-3" />
      </div>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
export default CodeBlock;
