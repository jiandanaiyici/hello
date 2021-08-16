import React, { Fragment } from 'react';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';

import { PreviewWrapper, PreviewActionsWrapper, ImageWrapper } from '../styled';
import { ImageItemPropsInt } from '../interface';

// todo: 放大缩小
// todo: 旋转

const Item = React.memo<ImageItemPropsInt>(
  ({ url, name = 'download', style, actions, onShow, ...rest }) => (
    <Fragment>
      <PreviewWrapper style={style}>
        {actions && (
          <PreviewActionsWrapper>
            <EyeOutlined
              style={{ color: '#fff', fontSize: 18 }}
              onClick={() => {
                onShow?.({ url, name, ...rest });
              }}
            />
            <a download={`${name}.png`} href={url}>
              <DownloadOutlined style={{ color: '#fff', fontSize: 18 }} />
            </a>
            {/* <Icon type="delete" /> */}
          </PreviewActionsWrapper>
        )}
        <ImageWrapper src={url} alt={name || '查看'} />
      </PreviewWrapper>
    </Fragment>
  ),
);

export default Item;
