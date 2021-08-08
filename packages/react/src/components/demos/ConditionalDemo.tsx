import React from 'react';

interface IState {
  isLogin: boolean;
}
class ConditionalDemo extends React.Component {
  render() {
    return <span>条件渲染</span>;
  }
}

/** 属性代理 */
function hocAuth(WrappedComponent) {
  return class Wrapper extends React.Component<any, IState> {
    state = {
      isLogin: false,
    };

    changeLogin = () => {
      this.setState((prevState) => ({
        isLogin: !prevState.isLogin,
      }));
    };

    render() {
      return !this.state.isLogin ? (
        <button className="btn btn-primary" onClick={this.changeLogin}>
          未登录 点击登录
        </button>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
}

/** 反向继承 */
function hocReverse(WrappedComponent) {
  return class Demo extends WrappedComponent<any, IState> {
    state = {
      isLogin: false,
    };

    changeLogin = () => {
      this.setState((prevState) => ({
        isLogin: !prevState.isLogin,
      }));
    };

    /** 一般需要从 props 中获取 */
    render() {
      if (!this.state.isLogin) {
        return (
          <button className="btn btn-primary" onClick={this.changeLogin}>
            未登录 点击登录
          </button>
        );
      }

      return super.render();
    }
  };
}

const ConditionalProxy = hocAuth(ConditionalDemo);
const ReverseConditional = hocReverse(ConditionalDemo);

export { ConditionalProxy, ReverseConditional };
