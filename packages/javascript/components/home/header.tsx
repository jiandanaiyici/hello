/**
 * @todo
 * 1. 滚动隐藏
 * 2. 设置位置
 * 3. 根据 pages 读取到路由配置, 是否可以自动生成导航栏
 * 4. mobile 情况设置
 */

import { SFC } from 'react';
import { HomeHeaderProps } from './types';

const HomeHeader: SFC<HomeHeaderProps> = (props) => {
  return (
    <header className="home_header">
      {props.children}
      <style jsx>
        {`
          .home_header {
            background: rgba(0, 0, 0, 0.6);
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
          }
        `}
      </style>
    </header>
  );
};

export default HomeHeader;
