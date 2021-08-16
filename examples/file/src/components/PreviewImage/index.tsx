import React, { Fragment, useState, useEffect } from 'react';
import { Modal } from 'antd';

import { useDetail } from '@/hooks';
import Item from './item';
import { getFileBlobUrls, getFileResultByFileReader } from './util';
import { PreviewImageListPropsInt } from './interface';
import { PreviewListWrapper } from './styled';

// 使用 URL.createObjectURL 方法
// todo: 判断展示单个 或者 展示为轮播图
// todo: 添加上传进度条

const PreviewImageList: React.FC<PreviewImageListPropsInt> = props => {
  const { files, preview, previewTitle, readType, actions } = props;
  const [fileBlobs, setFileBlobs] = useState<any[]>([]);
  const [state, { show, hide }] = useDetail<any>();

  useEffect(() => {
    async function getFileBlobsByFileReader() {
      const arr = await getFileResultByFileReader(files);
      setFileBlobs(arr);
    }

    if (readType === 'url') {
      setFileBlobs(getFileBlobUrls(files));
    }

    if (readType === 'fileReader') {
      getFileBlobsByFileReader();
    }
  }, [files]);

  const { name, url } = state?.data ?? {};

  return (
    <Fragment>
      <PreviewListWrapper>
        {fileBlobs.map(file => (
          <Item onShow={show} actions={actions} key={file.name} {...file} />
        ))}
      </PreviewListWrapper>
      {preview && actions && (
        <Modal
          destroyOnClose
          onCancel={hide}
          title={previewTitle}
          visible={state.visible}
        >
          <Item
            style={{ height: '100%', width: '100%' }}
            name={name || '查看'}
            key={name}
            url={url}
          />
        </Modal>
      )}
    </Fragment>
  );
};

PreviewImageList.defaultProps = {
  actions: true,
  readType: 'url',
};

export default PreviewImageList;
