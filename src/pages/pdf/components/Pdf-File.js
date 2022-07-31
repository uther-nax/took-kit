import React from 'react';

export function PdfFile({ id, file, removeAFile }) {
  const pageCount = file.getPageCount();
  return (
    <div>
      <div onClick={() => removeAFile(id)}>移除</div>
      {`${id}-${pageCount}:`}
    </div>
  );
}
