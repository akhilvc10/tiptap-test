"use client";
import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Extensions from "./extensions";
import Props from "./props";
import { useDrop, DropTargetMonitor } from "react-dnd";
function generateTree(rootblock: any) {
	const tree = rootblock.map((item) => {
		return {
			id: item.attrs.id,
			sectionNumber: item.attrs.sectionNumber,
			children: item.content.content
				.filter((child) => child.type.name === "childblock")
				.map((filteredChild) => ({
					id: filteredChild.attrs.id,
					blockNumber: filteredChild.attrs.blockNumber
				}))
		};
	});

	return tree;
}

const Editor: React.FC = () => {
	// const [sourceSectionNo, setSourceSectionNo] = useState<null | number>(null);
	// const [sourceBlockId, setSourceBlockId] = useState<null | number>(null);
	const [editorView, setEditorView] = useState(null);
	const [referenceObj, setReferenceObj] = useState([]);
	const [canDrag, setCanDrag] = useState(false);

	var sourceSectionNo;
	var sourceBlockId;

	const editor = useEditor({
		extensions: Extensions,
		editorProps: {
			handleDrop(view, event, slice, moved) {
				// const selectedBlockId = slice.content.content[0].attrs.id;
				// // Search for selected block id in reference obj and find its section numnber
				// const sectionId = findSectionNumber(selectedBlockId);
				// console.log(
				// 	"🚀 ~ file: index.tsx ~ line 50 ~ handleDrop ~ sectionId",
				// 	sectionId
				// );
				// //  If section no is not equal to section number in local state its return true else false
				// const content = event.dataTransfer;
			},
			handleDOMEvents: {
				drop: (view, event) => {
					const sectionNumber =
						event.target.attributes["data-sectionnumber"]?.value;
					console.log(
						"🚀 ~ file: index.tsx ~ line 51 ~ sectionNumber",
						sectionNumber
					);
				},
				dragstart: (view, event) => {
					const block = event.target.attributes["data-blockid"]?.value;
					console.log("🚀 ~ file: index.tsx ~ line 51 ~ block", block);
					const sectionNumber =
						event.target.attributes["data-sectionnumber"]?.value;
					console.log(
						"🚀 ~ file: index.tsx ~ line 53 ~ sectionNumber",
						sectionNumber
					);
					return false;
					// console.log("🚀 ~ file: index.tsx ~ line 51 ~ event", event);
					// if (!event.target) {
					// 	return false;
					// }
					// const pos = view.posAtDOM(event.target, 0);
					// const $pos = view.state.doc.resolve(pos);
					// console.log("$pos.parent.type", $pos.parent.type);
					// // @ts-ignore
					// if ($pos.parent.type === this.type) {
					// 	event.preventDefault();
					// }
					// return false;
				},

				dragend: (view, event) => {
					if (!event.target) {
						return false;
					}
					const pos = view.posAtDOM(event.target, 0);
					const $pos = view.state.doc.resolve(pos);
					console.log("$pos.parent.type", $pos.parent.type);
				}

				// dragenter: () => {
				// 	const validChildren = referenceObj.filter(
				// 		(section) =>
				// 			parseInt(section.sectionNumber) === parseInt(sourceSectionNo)
				// 	);

				// 	// const idExists =
				// 	// 	validChildren[0].children &&
				// 	// 	validChildren[0].children.some(
				// 	// 		(child) => child.id === sourceBlockId
				// 	// 	);
				// 	// if (idExists) {
				// 	// 	return false;
				// 	// } else {
				// 	// 	return true;
				// 	// }

				// 	console.log(
				// 		"🚀 ~ file: index.tsx ~ line 72 ~ validChildren",
				// 		validChildren
				// 	);
				// },

				// drop: (view, event) => {
				// 	// insertFiles(event.dataTransfer.files, {
				// 	// 	pos: coordinates.pos,
				// 	// 	editor
				// 	// });

				// 	// return true;
				// 	// let filteredSectionNumber = null

				// 	// console.log({ sourceBlockId, sourceSectionNo });
				// 	// console.log(
				// 	// 	"🚀 ~ file: index.tsx ~ line 69 ~ sourceSectionNo",
				// 	// 	sourceSectionNo
				// 	// );
				// 	// const validChildren = referenceObj.filter(
				// 	// 	(section) =>
				// 	// 		parseInt(section.sectionNumber) === parseInt(sourceSectionNo)
				// 	// );
				// 	// console.log(
				// 	// 	"🚀 ~ file: index.tsx ~ line 72 ~ validChildren",
				// 	// 	validChildren
				// 	// );
				// 	// const idExists = validChildren.children.some(
				// 	// 	(child) => child.id === sourceBlockId
				// 	// );
				// 	// if (idExists) {
				// 	// 	return false;
				// 	// } else {
				// 	// 	return true;
				// 	// }

				// 	// const block = event.target.attributes["data-blockid"]?.value;
				// 	// console.log("🚀 ~ file: index.tsx ~ line 40 ~ event", sec);
				// 	// console.log("🚀 ~ file: index.tsx ~ line 40 ~ event", block);
				// 	// console.log("🚀 ~ file: index.tsx ~ line 40 ~ event", event);
				// 	// console.log("🚀 ~ file: index.tsx ~ line 40 ~ view", view);

				// 	return false;
				// }
			},
			...Props
		},
		content: `
    <div data-type="rootblock">
      <h1>Section</h1>
    </div>
  `,
		onTransaction({ editor }) {
			const contentArr = editor.view.docView.node.content.content;
			const vals = generateTree(contentArr);
			console.log(
				"🚀 ~ file: index.tsx ~ line 71 ~ onTransaction ~ vals",
				vals
			);
			setReferenceObj(vals);
		}
	});

	function findSectionNumber(targetBlockId) {
		let result = null;

		referenceObj.forEach((section) => {
			section.children.forEach((child) => {
				if (child.id !== targetBlockId) {
					result = section.sectionNumber;
				}
			});
		});

		return result;
	}

	return (
		<div className="min-h-screen w-full">
			<EditorContent editor={editor!} />
		</div>
	);
};

export default Editor;
