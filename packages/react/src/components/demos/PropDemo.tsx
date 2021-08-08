import React from 'react';

class PropsDemo extends React.Component {
  render() {
    return (
      <div>
        <h6>修改 / 添加 props</h6>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

function hoc(WrappedComponent) {
  return class Wrapped extends React.Component {
    render() {
      const newProps = {
        name: '你好',
        age: 100,
      };
      console.log('props: %o', this.props, newProps);
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default hoc(PropsDemo);
