import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { DragHandleDots2Icon, PlusIcon } from '@radix-ui/react-icons';

const ChildBlockComponent: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
  updateAttributes,
}) => {
  const createNodeAfter = () => {
    // Calculate the position right after the current node
    const pos = getPos() + node.nodeSize;

    //If no block, init to 1
    let blockId = 1;
    console.log({ blockId });
    const currentSectionNumber = node.attrs.sectionNumber;

    /**
     * Find current section number
     */
    const currentSection = editor.getJSON().content?.find(
      // @ts-ignore
      content => content.attrs.sectionNumber === currentSectionNumber
    );

    /**
     * Find length of blocks of the found section
     */
    if (currentSection) {
      const blocks = currentSection.content?.length || 1;

      //This will be the block number
      blockId = blocks;
    }

    console.log(
      '🚀 ~ file: child-block-component.tsx ~ line 17 ~ createNodeAfter ~ sectionId',
      currentSectionNumber
    );

    // Use the editor's command to insert a new "rootblock" node at the calculated position
    editor
      .chain()
      .insertContentAt(pos, {
        type: 'childblock',
        attrs: {
          blockNumber: blockId,
          sectionNumber: node.attrs.sectionNumber,
        },
        content: [
          {
            type: 'paragraph',
          },
        ],
      })
      .focus(pos + 3) // Focus on the new block (you might need to adjust the position based on your exact requirements)
      .run();
  };

  return (
    <NodeViewWrapper
      as='div'
      className='group h-20 relative mx-auto flex w-auto gap-5 shadow-lg border-2 m-2 border-blue-600'>
      <div
        className='absolute -left-12 top-5 flex w-12 gap-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
        aria-label='left-menu'>
        {/* Button to add a new node after the current node */}
        <button type='button' onClick={createNodeAfter} className=''>
          <PlusIcon className='h-5 w-5' />
        </button>
        {/* Draggable handle button to allow rearranging nodes */}
        <button draggable data-drag-handle className='cursor-grab'>
          <DragHandleDots2Icon className='h-5 w-5' />
        </button>
      </div>
      {node.attrs.sectionNumber}.{node.attrs.blockNumber}
    </NodeViewWrapper>
  );
};

export default ChildBlockComponent;
