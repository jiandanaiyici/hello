import React, { Fragment, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Card, Input, Button, Row, Col } from 'antd';
import PreviewImageList from '../../components/PreviewImage';
import {
  uploadSingleImageToServerService,
  uploadMultipleImageToServerService,
} from './service';

const UploadImageToServer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [singleFile, setSingleFile] = useState<File | any>({});

  function chooseImages(evt: any) {
    setFiles(prevFiles => prevFiles.concat([...evt.target.files]));
  }

  function chooseSingleImage(evt: any) {
    setSingleFile(evt.target.files[0]);
  }

  async function uploadSingleImageToServer() {
    const formData = new FormData();
    formData.append('file', singleFile, singleFile.name);
    await uploadSingleImageToServerService(formData);
  }

  async function uploadMultipleImageToServer() {
    const formData = new FormData();
    for (let index = 0; index < files.length; index += 1) {
      formData.append('files', files[index], files[index].name);
    }
    await uploadMultipleImageToServerService(formData);
  }

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Card style={{ height: 500 }} title="原生 URL.createObjectURL 方法">
          <Button icon="upload" type="primary">
            选择图片&nbsp;
            <Input
              accept="image/*"
              onChange={chooseSingleImage}
              type="file"
              style={{
                opacity: 0,
                position: 'absolute',
                display: 'inline-block',
                width: '100%',
                top: 0,
                left: 0,
              }}
            />
          </Button>
          &nbsp;
          <Button
            disabled={!singleFile.name}
            onClick={uploadSingleImageToServer}
          >
            单张上传
          </Button>
          {singleFile && singleFile.name && (
            <PreviewImageList readType="url" files={[singleFile]} preview />
          )}
        </Card>
      </Col>
      <Col span={12}>
        <Card
          style={{ height: 500 }}
          title={
            <Fragment>
              原生-
              <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL">
                FileReader
              </a>
            </Fragment>
          }
        >
          <Button icon={<UploadOutlined />} type="primary">
            选择图片&nbsp;
            <Input
              accept="image/*"
              onChange={chooseImages}
              multiple
              type="file"
              style={{
                opacity: 0,
                position: 'absolute',
                display: 'inline-block',
                width: '100%',
                top: 0,
                left: 0,
              }}
            />
          </Button>
          &nbsp;
          <Button
            disabled={!files.length}
            onClick={uploadMultipleImageToServer}
          >
            多张上传
          </Button>
          {Array.isArray(files) && (
            <PreviewImageList readType="fileReader" files={files} preview />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default UploadImageToServer;
