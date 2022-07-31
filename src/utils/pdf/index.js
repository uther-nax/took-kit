import { PDFDocument } from 'pdf-lib';
import { PdfProxy } from './PdfProxy';

export function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function _(event) {
      resolve(event.target.result);
    };
    reader.readAsDataURL(blob);
  });
}

export async function blobToBuffer(blob) {
  const bufferData = await blob.arrayBuffer();
  return bufferData;
}

export function readAsArrayBuffer(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      if (typeof event.target.result === 'object') {
        resolve(new Blob([event.target.result]));
      } else {
        resolve(event.target.result);
      }
    };
  });
}

export function downloadFile(base64Data) {
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', base64Data);
  downloadLink.setAttribute('download', 'newPDF.pdf');
  downloadLink.click();
  URL.revokeObjectURL(downloadLink);
}

export async function renderToCanvas(canvas, pageProxy) {
  const pageViewPort = pageProxy.getViewport({ scale: 1 });
  const renderContext = canvas.getContext('2d');
  const task = pageProxy.render({
    canvasContext: renderContext,
    transform: [1, 0, 0, 1, 0, 0],
    viewport: pageViewPort,
  });
  await task.promise;
}

export async function loadFile(file) {
  const blob = await readAsArrayBuffer(file);
  const bufferData = await blobToBuffer(blob);
  const proxy = new PdfProxy(bufferData);
  await proxy.initFile();
  return proxy;
}

export async function createNewPdfFile() {
  const newFile = await PDFDocument.create();
  return newFile;
}

export function getPageIndices(count) {
  return Array.from({ length: count }, (v, k) => k);
}

export async function copyToNewFile(newFile, fileList) {
  const copiedPages = await Promise.all(
    fileList.map((file) => newFile.copyPages(file.operateProxy, getPageIndices(file.pageCount))),
  );
  copiedPages.flat().forEach((page) => {
    newFile.addPage(page);
  });
}
