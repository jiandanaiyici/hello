/**
 * 普通下载
 * 1. a标签 download 属性
 * 2. URL.createObjectURL
 * 3. Blob 对象
 */

import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { getFormValuesByPromise, normalDownloadFile } from '@/utils/download';

const normalContent = `
      将进酒
李白

君不见，黄河之水天上来，奔流到海不复回。
君不见，高堂明镜悲白发，朝如青丝暮成雪。
人生得意须尽欢，莫使金樽空对月。
天生我材必有用，千金散尽还复来。
烹羊宰牛且为乐，会须一饮三百杯。
岑夫子，丹丘生，将进酒，君莫停。
与君歌一曲，请君为我倾耳听。
钟鼓馔玉不足贵，但愿长醉不复醒。
古来圣贤皆寂寞，惟有饮者留其名。
陈王昔时宴平乐，斗酒十千恣欢谑。
主人何为言少钱，径须沽取对君酌。
五花马，千金裘，呼儿将出换美酒，
与尔同销万古愁。
`;

const { TextArea } = Input;
const { Item: FormItem } = Form;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const addonAfter = '.txt';

const NormalDownload = () => {
  const [form] = Form.useForm();
  const { getFieldDecorator, validateFields } = form;
  async function download() {
    const values = await getFormValuesByPromise(validateFields);
    normalDownloadFile(
      values.downloadContent,
      `${values.downloadFileName}${addonAfter}`,
    );
  }

  return (
    <Card title="纯文本下载">
      <Form {...layout}>
        <FormItem
          label="下载文件名称"
          name="downloadFileName"
          initialValue="将进酒"
          rules={[
            {
              required: true,
              message: '下载名称不能为空',
            },
          ]}
        >
          <Input addonAfter={addonAfter} />
        </FormItem>
        <FormItem
          label="下载文件名称"
          name="downloadContent"
          initialValue={normalContent}
          rules={[
            {
              required: true,
              message: '下载内容不能为空',
            },
          ]}
        >
          <TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
        </FormItem>
      </Form>
      <Button type="primary" onClick={download}>
        下载
      </Button>
    </Card>
  );
};

export default NormalDownload;
