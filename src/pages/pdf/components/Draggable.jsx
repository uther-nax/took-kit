import React, { useEffect } from 'react';

export function Draggable({
  element, updateDraggingPosition, reportOffsetPosition, id, ...other
}) {
  const RenderComponent = element;
  const dragPage = function _(event) {
    console.log('🚀 ~ file: Pdf-page.jsx ~ line 27 ~ dragPage ~ event', id, event);
  };
  const dropPage = function _(event) {
    console.log('🚀 ~ file: Pdf-page.jsx ~ line 30 ~ PdfPage ~ event', id, event);
  };
  const draging = function _(event) {
    const { pageX, pageY } = event;
    updateDraggingPosition(pageX, pageY);
  };
  const contentRef = React.createRef();
  useEffect(() => {
    const currentNode = contentRef.current;
    // reportOffsetPosition(id, currentNode.offsetLeft, currentNode.offsetTop);
  });
  return (
    <div ref={contentRef}>
      <RenderComponent
        {...other}
        onDragStart={dragPage}
        onDragEnd={dropPage}
        onDrag={draging}
        draggable="true"
      />
    </div>
  );
}
