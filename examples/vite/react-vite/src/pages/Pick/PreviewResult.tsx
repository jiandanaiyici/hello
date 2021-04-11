import React, { SFC } from 'react';

export interface PreviewResultProps {
  value?: string;
  height?: number;
}

const PreviewResult: SFC<PreviewResultProps> = props => {
  return (
    <pre style={{ maxHeight: props.height, overflow: 'auto' }}>
      {props.value}
    </pre>
  );
};

PreviewResult.defaultProps = {
  height: 400,
};

export default PreviewResult;
