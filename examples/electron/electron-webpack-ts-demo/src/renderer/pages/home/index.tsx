import { useEffect } from 'react';
import { Card } from 'antd';
import styles from './style.less';

const Home = () => {
  useEffect(() => {
    const webview = document.querySelector('webview');
    webview?.addEventListener('dom-ready', () => {
      // webview.insertCSS(`{
      //   iframe: {
      //     height: 100%;
      //   }
      // }`)
      // webview.openDevTools({
      //   mode: 'detach'
      // });
    });
  }, []);

  return (
    <Card title="Home" className={styles.home_page}>
      Home
      {/* <webview
        style={{ height: '100vh', width: '100vw', display: 'block' }}
        src="https://codepen.io/niexiaofei/pen/RwWLZqZ"
      /> */}
    </Card>
  );
};

export default Home;
