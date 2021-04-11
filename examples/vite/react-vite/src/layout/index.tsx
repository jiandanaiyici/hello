import React, { ReactNode, FC } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div>{props.children}</div>
  );
}

export default Layout;
