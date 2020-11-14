import React, { FC, useRef, useEffect, useState, useCallback } from 'react';
import { useFullscreen, useSetState } from 'ahooks';
import { IProps } from './types';
import ToolBar from './Toolbar';
import Loading from '../Loading';

import styles from './index.module.css';

const RIframe: FC<IProps> = (props) => {
  // const [loading, setLoading] = useState(true);
  const [state, setState] = useSetState({
    height: 0,
    width: 0,
    loading: true,
  });
  const fullRef = useRef<HTMLIFrameElement>();
  const iframeRef = useRef<HTMLIFrameElement>();
  const [isFullscreen, { setFull, exitFull }] = useFullscreen(fullRef, {
    onFull: props.actions?.onFull,
    onExitFull: props.actions?.onExitFull,
  });

  // const loadIframe = useCallback(async () => {
  //   return new Promise((resolve, reject) => {
  //     return resolve();
  //   }).finally(() => {
  //     setState({ loading: false });
  //   });
  // }, [props.onLoaded]);

  const loadIframe = useCallback(() => {
    setState({ loading: false });
    if (props.onLoaded) {
      props.onLoaded();
    }
  }, [props.onLoaded]);

  useEffect(() => {
    if (iframeRef.current) {
      // const { width, height } = iframeRef.current.getBoundingClientRect();
      iframeRef.current.addEventListener('load', loadIframe);
      // iframeRef.current.addEventListener('error', props.onError);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', props.onLoaded);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={fullRef}>
      {props.showToolbar && (
        <ToolBar onFull={setFull} onExit={exitFull} isFullscreen={isFullscreen} />
      )}
      {(props.title || props.extra) && (
        <header className={styles.header}>
          <div className={styles.title}>{props.title}</div>
        </header>
      )}
      <div className={styles.content}>
        <Loading spinning={state.loading} />
        <iframe
          // style={{ visibility: loading ? 'hidden' : 'visible' }}
          className={styles.iframe_wrapper}
          ref={iframeRef}
          src={props.src}
          width={props.width}
          height={props.height}
        />
      </div>
    </div>
  );
};

RIframe.defaultProps = {
  width: '100%',
  height: '100%',
  frameBorder: 0,
  showToolbar: true,
  scrolling: 'auto',
};

export default RIframe;
