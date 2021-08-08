import React from 'react';

import styles from './index.module.css';
import Wrapper from './Wrapper';

export class Demo extends React.Component<any, any> {
  render() {
    return <span>给当前容器添加布局样式</span>;
  }
}

function hoc(WrappedComponent) {
  return class Wrapped extends React.Component<any, any> {
    render() {
      return (
        <div className={styles.wrapper}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

function hocReverse(WrappedComponent) {
  return class Demo extends WrappedComponent<any> {
    render() {
      return <div className={styles.wrapper}>{super.render()}</div>;
    }
  };
}

const HocDemo = hoc(Demo);
const ReverseDemo = hocReverse(Demo);

const LayoutDemo = () => {
  return (
    <Wrapper>
      <Demo title="原组件" />
      <HocDemo title="高阶组件" />
    </Wrapper>
  );
};

const ReverseLayout = () => {
  return (
    <Wrapper>
      <Demo title="原组件" />
      <ReverseDemo title="高阶组件" />
    </Wrapper>
  );
};

export { LayoutDemo, ReverseLayout };
