import React from 'react';

interface IProps {
  callbackRef: (el: HTMLTextAreaElement) => void;
}

class ClassRefDemo extends React.Component<IProps> {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;

  constructor(props) {
    super(props);
    this.textareaRef = React.createRef<HTMLTextAreaElement | null>();
  }

  childFocus() {
    if (this.textareaRef.current) {
      this.textareaRef.current.focus();
    }
  }

  render() {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text">测试聚焦</span>
        <textarea
          ref={this.textareaRef}
          // ref={(el) => {
          //   this.props.callbackRef(el);
          // }}
          className="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
    );
  }
}

function hoc(WrappedComponent) {
  return class Wrapped extends React.Component {
    childRef = React.createRef<ClassRefDemo>();
    callbackChildRef: HTMLTextAreaElement | null = null;

    onFocusByRef = () => {
      /** 1. 层层获取 */
      if (this.childRef.current) {
        this.childRef.current?.textareaRef.current.focus();
      }

      /** 2. 直接获取子子组件方法 */
      // if (this.childRef.current) {
      //   this.childRef.current.childFocus();
      // }

      /** 通过回调方式获取到子组件内的 ref */
      // if (3. this.callbackChildRef) {
      //   this.callbackChildRef.focus();
      // }
    };

    render() {
      return (
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <button className="btn btn-primary" onClick={this.onFocusByRef}>
                点击类组件聚焦
              </button>
            </div>
            <WrappedComponent
              ref={this.childRef}
              {...this.props}
              // callbackRef={(el) => {
              //   this.callbackChildRef = el;
              // }}
            />
          </div>
        </div>
      );
    }
  };
}

export default hoc(ClassRefDemo);
