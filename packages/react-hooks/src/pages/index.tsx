import React from 'react';
import { Image } from 'antd';
import useResizeRect from '@/hooks/useResizeRect';

export default () => {
  const [ref, rect] = useResizeRect<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        width: rect.width,
        minWidth: '100%',
        height: rect.height,
        minHeight: '100%',
      }}
    >
      <Image
        alt="随机"
        // width="100%"
        width={rect.width}
        preview={false}
        height={rect.height}
        src="https://source.unsplash.com/random/1200x800"
      />
    </div>
  );
};
