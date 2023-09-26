"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Extensions from "./extensions";
import Props from "./props";

const Editor: React.FC = () => {
	const editor = useEditor({
		extensions: Extensions,
		editorProps: Props,
		content: `
    <div data-type="rootblock">
      <h1>Section</h1>
    </div>
   
   
  `
	});

	return (
		<div className="min-h-screen w-full">
			<EditorContent editor={editor!} />
		</div>
	);
};

export default Editor;
