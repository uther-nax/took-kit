import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { animated, easings, useSpring } from '@react-spring/web';
import { useDispatch } from 'react-redux';
import { hide, show } from '../../../store/ToastSlice';

export const Toast = function _({ isShow, content }) {
  console.log('🚀 ~ file: Toast.jsx ~ line 6 ~ isShow', isShow);
  const hidden = css`
    display: none;
  `;
  const css_toast_bg = css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    ${isShow ? '' : hidden}
  `;
  const css_content_container = css`
    padding: 0.7rem 1.2rem;
    border-radius: .6rem;
    background-color: rgba(0,0,0,0.8);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.3);
  `;
  const [fadeStyles, fadeApi] = useSpring(() => ({
    opacity: 0,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (isShow) {
      fadeApi.start({
        delay: 0,
        config: {
          easing: easings.easeOutQuart,
          duration: 2000,
        },
        to: async (next) => {
          await next({ opacity: 1 });
          dispatch(hide());
          fadeApi.start({
            config: {
              duration: 0,
            },
            to: { opacity: 0 },
          });
        },
      });
    }
  });
  return (
    <animated.div css={css`${css_toast_bg}`} style={fadeStyles}>
      <div css={css`${css_content_container}`}>
        {content}
      </div>
    </animated.div>
  );
};
