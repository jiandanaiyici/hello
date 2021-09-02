/** 整体布局 */
import React, { useMemo, useState } from 'react';

import { Layout } from 'antd';
import { useRouteMatch } from 'umi';

import SiderTree from './sider-tree';

import styles from './style.less';
import BaseLayout from './base-layout';

const { Sider } = Layout;

const PageLayout = React.memo((props: any) => {
  const tabMatched = !!useRouteMatch('/electron-tabs');
  const [state, setState] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setState(collapsed);
  };

  const routes = useMemo(() => {
    return props.route.routes.filter((item: any) => !!item.component || !item.pass);
  }, [props.route.routes]);


  return tabMatched ? (
    <BaseLayout routes={routes} tabMatched={tabMatched}>
      {props.children}
    </BaseLayout>
  ) : (
    <Layout style={{ minHeight: '100vh' }} className={styles['layout']}>
      <Sider collapsible collapsed={state} onCollapse={onCollapse}>
        <SiderTree />
      </Sider>
      <BaseLayout routes={routes} tabMatched={tabMatched}>
        {props.children}
      </BaseLayout>
    </Layout>
  );
});

export default PageLayout;
