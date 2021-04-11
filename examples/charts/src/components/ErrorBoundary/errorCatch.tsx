import React, { Component, PureComponent } from 'react';
import ErrorBoundary from '.';

/** 利用高阶函数 */
export default (Target: Component) => {
  return class Wrapper extends PureComponent {
    render() {
      return (
        <ErrorBoundary>
          <Target {...this.props} />
        </ErrorBoundary>
      );
    }
  };
};
