/**
 * 扩展 Dropdown
 */
import React, { FC, useMemo, SFC, useRef } from 'react';
import { Button, Dropdown } from 'antd';
import cs from 'classnames';
// import { omit } from 'lodash';

import styles from './index.less';
import { HeaderProps, FooterProps, ExpandDropdownProps } from './interface';

const clickStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
};

/**
 * todo 关闭
 */
const Header: SFC<HeaderProps> = ({ title, extra }) => {
  return (
    <div className={styles.header_wrapper} onClick={clickStopPropagation}>
      {title && <span className={styles.title}>{title}</span>}
      {extra && <span className={styles.extra}>{extra}</span>}
    </div>
  );
};

const Footer: FC<FooterProps> = (props) => {
  const { okButtonProps, cancelButtonProps } = props;

  return (
    <div className={styles.footer_wrapper} onClick={clickStopPropagation}>
      {props.cancelVisible && (
        <Button onClick={props.onCancel} size="small" {...cancelButtonProps} />
      )}
      <Button onClick={props.onOk} size="small" {...okButtonProps} />
    </div>
  );
};

Footer.defaultProps = {
  okButtonProps: {
    children: '确定',
    type: 'primary',
  },
  cancelVisible: true,
  cancelButtonProps: {
    children: '取消',
    type: 'default',
  },
};

const ExpandDropdown: FC<ExpandDropdownProps> = (props) => {
  const {
    footer,
    visible,
    children,
    triggerNode,
    triggerStyle,
    onVisibleChange,
    triggerClassName,
    ...restProps
  } = props;
  const triggerRef = useRef<HTMLSpanElement | any>();

  const triggerKls = useMemo(
    () =>
      cs(styles.trigger_wrapper, props.triggerClassName, {
        [styles.opened]: visible,
      }),
    [visible, props.triggerClassName],
  );

  const overlayKls = useMemo(() => cs(styles.overlay_wrapper, props.overlayClassName), [
    props.overlayClassName,
  ]);

  /**
   * todo: 获取展开后的 classList 后进行 translateY 移动
   * 1. 暂时使用 visible 控制
   */

  // const dropProps = useMemo(() => omit(restProps, ['getPopupContainer', 'onVisibleChange']), [
  //   JSON.stringify(restProps),
  // ]);

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={onVisibleChange}
      getPopupContainer={() => triggerRef.current}
      overlay={
        <div className={overlayKls} style={props.overlayStyle} onClick={clickStopPropagation}>
          {(props.title || props.extra) && <Header title={props.title} extra={props.extra} />}
          <div className={styles.overlay_content} onClick={clickStopPropagation}>
            {children}
          </div>
          {footer && <Footer {...footer} />}
        </div>
      }
      {...restProps}
    >
      <span className={triggerKls} style={triggerStyle} ref={triggerRef}>
        {triggerNode}
      </span>
    </Dropdown>
  );
};

ExpandDropdown.defaultProps = {
  triggerNode: 'Hover Me',
  trigger: ['click'],
  placement: 'bottomLeft',
  footer: Footer.defaultProps,
  ...Header.defaultProps,
};

export default ExpandDropdown;
