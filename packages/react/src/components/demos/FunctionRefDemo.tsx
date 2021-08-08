import React, { useRef, useImperativeHandle, useCallback } from 'react';

const FunctionRefDemo = React.forwardRef((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      },
    };
  });

  return (
    <div className="input-group mb-3">
      <span className="input-group-text">测试聚焦</span>
      <textarea
        ref={textareaRef}
        className="form-control"
        aria-label="With textarea"
      ></textarea>
    </div>
  );
});

function hoc(WrappedComponent) {
  return function Wrapped(props) {
    const wrapperRef = useRef<any>();

    const onFocusByRef = useCallback(() => {
      if (wrapperRef.current) {
        wrapperRef.current.focus();
      }
    }, [wrapperRef]);

    return (
      <div className="card">
        <div className="card-body">
          <button onClick={onFocusByRef} className="btn btn-primary">
            点击聚焦
          </button>
          <WrappedComponent ref={wrapperRef} {...props} />
        </div>
      </div>
    );
  };
}

export default hoc(FunctionRefDemo);
