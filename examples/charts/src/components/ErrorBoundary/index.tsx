import React, { Fragment, ErrorInfo, ReactNode } from 'react';
import { Result } from 'antd';

interface ErrorBoundaryProps {
  title: ReactNode;
  errorback?(errorInfo: ErrorInfo): void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    title: '页面出错了, 请尝试刷新',
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    if (typeof this.props.errorback === 'function') {
      this.props.errorback(errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <Result status="error" title={this.props.title} extra={this.state.errorInfo} />;
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
