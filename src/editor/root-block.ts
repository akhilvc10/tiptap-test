import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin, PluginKey, NodeSelection } from "prosemirror-state";
import { dropPoint } from "prosemirror-transform";
import RootBlockComponent from "./root-block-component";

function eventCoords(event: MouseEvent) {
	return { left: event.clientX, top: event.clientY };
}

const stateKey = new PluginKey("task-item-drop-override");
// Extend the Commands interface to include RootBlockCommands
declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		RootBlockCommands: {
			setRootBlock: (position?: number) => ReturnType;
		};
	}
}

function findSectionNumber(rootblockArray, id) {
	let sectionNumber = undefined;
	let rootblockId = undefined;
	rootblockArray.forEach((rootblock) => {
		rootblock.content.forEach((block) => {
			if (block.attrs.id === id) {
				sectionNumber = block.attrs.sectionNumber;
				rootblockId = block.attrs.id;
				return; // break out of the loop
			}
		});
	});

	return { sectionNumber, rootblockId };
}
// Create and export the RootBlock node
export const RootBlock = Node.create({
	name: "rootblock",
	group: "rootblock",
	content: "heading childblock+", // Ensure only one block element inside the rootblock
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
			sectionNumber: {
				default: 1
			}
		};
	},
	// Rules to parse the node from HTML
	parseHTML() {
		return [
			{
				tag: 'div[data-type="rootblock"]'
			}
		];
	},

	// Rules to render the node to HTML
	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(HTMLAttributes, { "data-type": "rootblock" }),
			0
		];
	},

	// Use ReactNodeViewRenderer to render the node view with the RootBlockComponent
	addNodeView() {
		return ReactNodeViewRenderer(RootBlockComponent);
	}
	// addProseMirrorPlugins() {
	// 	return [
	// 		new Plugin({
	// 			props: {
	// 				handleDOMEvents: {
	// 					// prevent dragging nodes out of the figure
	// 					dragstart: (view, event) => {
	// 						if (!event.target) {
	// 							return false;
	// 						}

	// 						const pos = view.posAtDOM(event.target as HTMLElement, 0);
	// 						const $pos = view.state.doc.resolve(pos);

	// 						if ($pos.parent.type === this.type) {
	// 							event.preventDefault();
	// 						}

	// 						return false;
	// 					}
	// 				}
	// 			}
	// 		})
	// 	];
	// }

	// addProseMirrorPlugins() {
	// 	return [
	// 		// The plugin prevent child nodes from being dragged out of their parent
	// 		// node.
	// 		new Plugin({
	// 			props: {
	// 				handleDOMEvents: {
	// 					dragstart: (view, event) => {
	// 						if (!event.target) {
	// 							return false;
	// 						}

	// 						const pos = view.posAtDOM(event.target, 0);
	// 						const $pos = view.state.doc.resolve(pos);

	// 						if ($pos.parent.type === this.type) {
	// 							event.preventDefault();
	// 						}

	// 						return false;
	// 					}
	// 				}
	// 			}
	// 		})
	// 	];
	// }
});

export default RootBlock;
