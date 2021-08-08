import React from 'react';

function hoc(WrappedComponent) {
  return class Wrapped extends React.Component {
    constructor(props) {
      super(props);
      console.log('constructor: hoc');
    }
    componentDidMount() {
      console.log('didmount: hoc');
    }

    componentDidUpdate() {
      console.log('componentDidUpdate: hoc');
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

class LifeCycleDemo extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor: WrappedComponent');
  }

  componentDidMount() {
    console.log('didmount: WrappedComponent');
  }

  render() {
    return <button className="btn btn-primary">打开控制台</button>;
  }
}

export default hoc(LifeCycleDemo);
