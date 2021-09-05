import { useCallback } from 'react';
import { Layout, Button } from 'antd';
import { useHistory } from 'umi';
import styles from './style.less';

const { Sider, Header, Content } = Layout;

const PageLayout = (props: any) => {
  const history = useHistory();

  const goToPage = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible>
        侧边栏
      </Sider>
      <Layout className={styles['site-layout']}>
        <Header className={styles['site-layout-background']}>
          <Button
            type="link"
            onClick={() => {
              goToPage('home');
            }}
          >
            首页
          </Button>
          <Button
            type="link"
            onClick={() => {
              goToPage('tabs');
            }}
          >
            多 Tab
          </Button>
          <Button
            type="link"
            onClick={() => {
              goToPage('about');
            }}
          >
            关于我
          </Button>
        </Header>
        <Content style={{ padding: '0 16px' }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
