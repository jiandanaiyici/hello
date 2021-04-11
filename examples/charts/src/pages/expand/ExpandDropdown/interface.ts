import { DropDownProps } from 'antd/lib/dropdown';
import { BaseButtonProps } from 'antd/lib/button/button';
import { ReactNode, CSSProperties } from 'react';

export type FilterTypes = 'getPopupContainer' | 'overlay';
export interface ExpandDropdownProps extends Omit<DropDownProps, FilterTypes>, HeaderProps {
  triggerNode?: ReactNode;
  triggerStyle?: CSSProperties;
  triggerClassName?: string;
  footer?: FooterProps;
  children?: ReactNode;
}

export interface FooterProps {
  onOk?: () => void;
  onCancel?: () => void;
  cancelVisible?: boolean;
  okButtonProps?: Omit<BaseButtonProps, 'size'>;
  cancelButtonProps?: Omit<BaseButtonProps, 'size'>;
}

export interface HeaderProps {
  title?: ReactNode;
  extra?: ReactNode;
}
