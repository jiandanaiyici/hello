import type { TooltipProps } from 'antd/es/tooltip';

export const getPopupContainer = (triggerNode: HTMLElement | null) => {
  if (triggerNode?.parentElement) {
    return triggerNode.parentElement;
  }

  return document.body;
};

export const TOOLTIP_PROPS: TooltipProps = {
  getPopupContainer,
} as TooltipProps;
