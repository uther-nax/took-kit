import { css } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { PdfPage } from './components/Pdf-Page';

export function PdfReader({ pdfProxy }) {
  const [scale, setScale] = useState(0.5);
  const { pageCount } = pdfProxy;
  const detailConainer = css`
    font-size: 0.67rem;
    padding: 0.5rem 0;
  `;
  return (
    <div css={css`${cssFileContainer}`}>
      <PdfPage
        fileProxy={pdfProxy}
        pageNumber={1}
        scale={scale}
      />
      <div css={css`${detailConainer}`}>
        共
        {pageCount}
        页
      </div>
    </div>
  );
}

// border: 1px solid #efefef;
const cssFileContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
