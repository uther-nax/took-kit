import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

export function PdfPage({ fileProxy, pageNumber }) {
  const cssContainerStyle = css`
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .67rem;
    overflow: hidden;
    box-shadow: 0 0 12px 2px rgba(0,0,0,.5);
  `;
  const cssPageStyle = css`
    width: 100%;
    height: 100%;
  `;
  const [rect, setRect] = useState([0, 0]);
  const [renderTask, setRenderTask] = useState(null);
  const canvasRef = React.createRef();
  const [pageProxy, setPageProxy] = useState(null);
  useEffect(() => {
    const renderPdf = async () => {
      console.log('🚀 ~ file: Pdf-Page.jsx ~ line 20 ~ renderPdf ~ renderTask');
      if (renderTask) {
        renderTask.cancel();
      }
      const pageInstance = await fileProxy.getPageProxy(pageNumber);
      const pageViewPort = pageInstance.getViewport({ scale: 1 });
      const { width = 0, height = 0 } = pageViewPort || {};
      setRect([width, height]);
      const canvas = canvasRef.current;
      const renderContext = canvas.getContext('2d');
      const task = pageInstance.render({
        canvasContext: renderContext,
        transform: [1, 0, 0, 1, 0, 0],
        viewport: pageViewPort,
      });
      setRenderTask(task);
      await task.promise;
      setRenderTask(null);
      setPageProxy(pageInstance);
    };
    renderPdf();
  }, [pageProxy]);
  return (
    <div css={css`${cssContainerStyle}`}>
      <canvas
        css={css`${cssPageStyle}`}
        ref={canvasRef}
        width={rect[0]}
        height={rect[1]}
      />
    </div>
  );
}
