import StarterKit from "@tiptap/starter-kit";
import { Node } from "@tiptap/core";
import RootBlock from "./root-block";
import ChildBlock from "./child-block";
import UniqueID from "@tiptap-pro/extension-unique-id";
import MiddleBlock from "./middle-block";

const Document = Node.create({
	name: "doc",
	topNode: true,
	content: "rootblock+"
});

const Extensions = [
	Document,
	RootBlock,
	ChildBlock,
	MiddleBlock,
	UniqueID.configure({
		types: ["childblock", "rootblock"]
	}),
	StarterKit.configure({
		document: false
	})
];

export default Extensions;
