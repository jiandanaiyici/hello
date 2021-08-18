import { Card } from 'antd';

import styles from './index.less';

export default function IndexPage() {
  return (
    <Card title="首页">
      <h1 className={styles.title}>首页</h1>
    </Card>
  );
}
