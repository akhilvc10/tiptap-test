import StarterKit from "@tiptap/starter-kit";
import { Node } from "@tiptap/core";
import RootBlock from "./root-block";
import ChildBlock from "./child-block";

const Document = Node.create({
	name: "doc",
	topNode: true,
	content: "rootblock+"
});

const Extensions = [
	Document,
	RootBlock,
	ChildBlock,
	StarterKit.configure({
		document: false
	})
];

export default Extensions;
