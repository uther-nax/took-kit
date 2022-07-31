import { nanoid } from 'nanoid';
import * as PDFJS from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
import { PDFDocument } from 'pdf-lib';

PDFJS.workerSrc = workerSrc;

export class PdfProxy {
  constructor(fileData) {
    this.fileData = fileData;
    this.readProxy = null;
    this.uniqueId = nanoid();
    this.operateProxy = null;
    this.pageList = [];
    this.fileId = '';
    this.pageList = [];
  }

  get pageCount() {
    return this.readProxy.numPages || 0;
  }

  get id() {
    const idValList = [this.fileId, this.uniqueId].map((val) => (val || 'null'));
    return idValList.join('.');
  }

  async initFile() {
    this.readProxy = await PDFJS.getDocument(this.fileData).promise;
    this.fileId = this.readProxy.fingerprints.map((val) => (val || 'null')).join('.');
    this.operateProxy = await PDFDocument.load(this.fileData);
    // const allPage = await Promise.all(
    //   Array
    //     .from({ length: this.pageCount }, (v, i) => (i + 1))
    //     .map((pageNumber) => this.readPage(pageNumber)),
    // );
    // this.pageList = allPage.map((pageProxy) => ({
    //   id: nanoid(),
    //   pageProxy,
    // }));
  }

  async getPageProxy(pageNumber) {
    const proxy = await this.readProxy.getPage(pageNumber);
    return proxy;
  }

  async readPage(pageNumber) {
    if (!this.readProxy) {
      this.readProxy = await this.readProxy.promise;
    }
    const pageInstance = await this.readProxy.getPage(pageNumber);
    return pageInstance;
  }
}

// const mergePages = async function _() {
//   const files = Object.values(toMergeFile).filter((file) => !!file);
//   if (files.length < 2) {
//     aniBtnApi.start({
//       delay: 0,
//       config: {
//         duration: 50,
//       },
//       to: async (next) => {
//         await next({ transform: 'translateX(25px)' });
//         await next({ transform: 'translateX(-25px)' });
//         await next({ transform: 'translateX(0)' });
//       },
//     });
//     return;
//   }
//   const newFile = await createNewPdfFile();
//   const copiedPages = await copyToNewFile(newFile, files);
//   copiedPages.flat().forEach((page) => {
//     newFile.addPage(page);
//   });
//   const fileData = await newFile.saveAsBase64({ dataUri: true });
//   downloadFile(fileData);
// };
