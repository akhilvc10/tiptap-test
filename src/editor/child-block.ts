import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin, PluginKey, NodeSelection } from "prosemirror-state";

import ChildBlockComponent from "./child-block-component";

// Create and export the RootBlock node
export const ChildBlock = Node.create({
	name: "childblock",
	group: "inline*",
	content: "block+", // Ensure only one block element inside the rootblock
	draggable: true, // Make the node draggable
	selectable: false, // Node isn't selectable
	inline: false, // Node is a block-level element
	priority: 1000, // Priority for node resolution

	// Default options for the node
	addOptions() {
		return {
			HTMLAttributes: {}
		};
	},

	addAttributes() {
		return {
			blockNumber: {
				default: 1
			},
			sectionNumber: {
				default: 1
			}
		};
	},

	// Rules to parse the node from HTML
	parseHTML() {
		return [
			{
				tag: 'div[data-type="childblock"]'
			}
		];
	},

	// Rules to render the node to HTML
	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(HTMLAttributes, { "data-type": "childblock" }),
			0
		];
	},

	// Use ReactNodeViewRenderer to render the node view with the RootBlockComponent
	addNodeView() {
		return ReactNodeViewRenderer(ChildBlockComponent);
	}
});

export default ChildBlock;
