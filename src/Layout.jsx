import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toast } from './pages/pdf/components/Toast';

export function Layout() {
  const cssContainerStyle = css`
    background-color: #d5d5d5;
    min-width: 100%;
    min-height: 100%;
    padding: 1rem;
    margin: 0;
    box-sizing: border-box;
  `;
  const toastState = useSelector((state) => state.toastState);
  const curLocation = useLocation();
  const { pathname } = curLocation;
  const navi = useNavigate();
  useEffect(() => {
    if (pathname === '/') {
      navi('./pdf/merge', { replace: true });
    }
  });
  return (
    <div css={css`${cssContainerStyle}`}>
      <Toast isShow={toastState.isShow} content={toastState.content} />
      <Outlet />
    </div>
  );
}
