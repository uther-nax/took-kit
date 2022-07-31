import { css } from '@emotion/react';
import React, { useCallback, useReducer, useState } from 'react';
import { animated, easings, useSpring } from '@react-spring/web';
import { useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import {
  copyToNewFile, createNewPdfFile, downloadFile, loadFile,
} from '../../utils/pdf';
import { button } from './common-css';
import { PdfReader } from './Pdf-Reader';
import { hide, show } from '../../store/ToastSlice';

const hidden = css`
  visibility: hidden;
  position: absolute;
  z-index: -1;
`;

const cssFileList = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;
console.log(window.visualViewport);
const cssFileContainer = css`
  width: ${isMobile ? '90%' : '20%'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 1rem;
`;

const cssMergeBtn = css`
  ${button}
  background-color: black;
  color: #ccc;
`;

const cssRemoveBtn = css`
  ${button}
  background-color: black;
  color: #ccc;
`;

const cssBtnContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const cssFileBtns = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function MergePdfPage() {
  const [aniBtnStyles, aniBtnApi] = useSpring(() => ({
    transform: 'translateX(0)',
  }));

  const [fileList, setFileList] = useState([]);
  // 选择文件处理函数
  const onInputPdf = async function _(event) {
    const [file] = event.target.files;
    const pdfProxy = await loadFile(file);
    const [fileProxy] = fileList.filter((file) => file.fileId === pdfProxy.fileId);
    if (fileProxy) {
      dispatch(show({ content: '重复的文件' }));
      return;
    }
    // dispatch({ type: 'ADD', content: pdfProxy });
    setFileList([...fileList, pdfProxy]);
    fileInputRef.current.value = null;
  };

  const fileInputRef = React.createRef();

  // 选择文件
  const chooseFile = function _() {
    fileInputRef.current.click();
  };

  // 移除文件
  const removeAFile = (id) => {
    const lefted = fileList.filter((file) => file.fileId !== id);
    setFileList(lefted);
  };

  const dispatch = useDispatch();

  const mergePages = async function _() {
    if (fileList.length < 2) {
      dispatch(show({ content: '至少选择2个文件' }));
      aniBtnApi.start({
        delay: 0,
        config: {
          duration: 50,
        },
        to: async (next) => {
          await next({ transform: 'translateX(25px)' });
          await next({ transform: 'translateX(-25px)' });
          await next({ transform: 'translateX(0)' });
        },
      });
      return;
    }
    const newFile = await createNewPdfFile();
    await copyToNewFile(newFile, fileList);
    const fileData = await newFile.saveAsBase64({ dataUri: true });
    downloadFile(fileData);
  };

  return (
    <>
      <div css={css`${cssFileList}`}>
        {
          fileList.map((file) => (
            <div css={css`${cssFileContainer}`} key={file.fileId}>
              <PdfReader pdfProxy={file} />
              <div css={css`${cssFileBtns}`}>
                <div css={css`${cssRemoveBtn}`} onClick={() => removeAFile(file.fileId)}>移除</div>
              </div>
            </div>
          ))
        }
      </div>
      <div css={css`${cssBtnContainer}`}>
        <input css={css`${hidden}`} type="file" accept="application/pdf" onInput={onInputPdf} ref={fileInputRef} name="pdf-file" id="pdf-file" />
        <animated.div css={css`${cssMergeBtn}`} onClick={chooseFile}>添加文件</animated.div>
        <animated.div css={css`${cssMergeBtn}`} style={aniBtnStyles} onClick={mergePages}>合并</animated.div>
      </div>
    </>
  );
}
