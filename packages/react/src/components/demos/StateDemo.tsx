import React from 'react';

class StateDemo extends React.Component<{
  value: string;
  onChange: (e: any) => void;
}> {
  render() {
    const { value, onChange } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">通过抽象 state 实现一个 input 输入</div>
          <input value={value} onChange={onChange} />
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

function hoc(WrappedComponent) {
  return class Wrapped extends React.Component<{}, { value: string }> {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };

      this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
      this.setState({ value: e.target.value });
    }

    render() {
      const newProps = {
        value: this.state.value,
        onChange: this.onChange,
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default hoc(StateDemo);
