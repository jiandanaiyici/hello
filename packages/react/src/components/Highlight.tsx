import React, { SFC, ReactNode } from 'react';

export interface HighlightProps {
  children?: ReactNode;
  color?: string;
}

const Highlight: SFC<HighlightProps> = ({ children, color }) => (
  <div
    style={{
      backgroundColor: color,
      borderRadius: '4px',
      color: '#fff',
      display: 'inline-block',
      padding: '0.4rem',
      margin: '1rem',
    }}
  >
    {children}
  </div>
);

export default Highlight;
