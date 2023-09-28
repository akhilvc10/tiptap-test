"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Extensions from "./extensions";
import Props from "./props";

function generateTree(rootblock: any) {
	const tree = {
		id: rootblock.attrs.id,
		sectionNumber: rootblock.attrs.sectionNumber,
		children: []
	};

	for (const block of rootblock.content.content) {
		if (block.type.name === "childblock") {
			tree.children.push({
				id: block.attrs.id,
				blockNumber: block.attrs.blockNumber
			});
		}
	}

	return tree;
}

const Editor: React.FC = () => {
	const [referenceObj, setReferenceObj] = useState([]);
	const editor = useEditor({
		extensions: Extensions,
		editorProps: Props,
		content: `
    <div data-type="rootblock">
      <h1>Section</h1>
    </div>
  `,
		onTransaction({ editor }) {
			const content = editor.view.docView.node.content.content[0];

			const vals = generateTree(content);
			console.log(
				"🚀 ~ file: index.tsx ~ line 44 ~ onTransaction ~ vals",
				vals
			);

			// setReferenceObj(array);
		}
	});
	useEffect(() => {
		console.log(
			"🚀 ~ file: index.tsx ~ line 43 ~ useEffect ~ referenceObj",
			referenceObj
		);
	}, [referenceObj]);

	return (
		<div className="min-h-screen w-full">
			<EditorContent editor={editor!} />
		</div>
	);
};

export default Editor;
