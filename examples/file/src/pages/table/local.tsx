/** 普通表格数据导出 */
import React, { useRef, useState, useCallback, Fragment } from 'react';
import { Card, Table, Radio, Button, message, Row, Col, Drawer } from 'antd';
import type { TableColumnsType } from 'antd';
import XLSX from 'xlsx';
import { prettyPrint } from 'html';

import Editor from "@monaco-editor/react";


import mock from './_mock';
import ExportData from './ExportData';
import type { ExportFileType } from './ExportData'
import { useDetail } from '@/hooks';

const columns: TableColumnsType<any> = [{
  dataIndex: 'id',
  key: 'id',
  title: 'ID',
  fixed: 'left'
}, {
  dataIndex: 'name',
  key: 'name',
  title: '姓名'
}, {
  dataIndex: 'address',
  key: 'address',
  title: '地址'
}, {
  dataIndex: 'birthday',
  key: 'birthday',
  title: '生日'
}]

interface RadioListType {
  value: ExportFileType;
  label: string;
  key?: ExportFileType
};

const list: RadioListType[] = [{
  value: 'excel',
  label: 'Excel',
}, {
  value: 'csv',
  label: 'CSV'
}, {
  value: 'json',
  label: 'JSON'
}]


const TableWrapper = (props: any) => {
  return (
    <table ref={props.tableRef} {...props} />
  );
}

const ExportLocalTableData: React.FC = () => {
  const tableRef = useRef();
  const [state, { show, hide }] = useDetail<{
    csv: string;
    json: any[];
    html: string;
    text: string;
  }>({
    csv: '',
    json: [],
    html: '',
    text: ''
  });
  const [type, setType] = useState<ExportFileType>('excel');
  const exportRef = useRef(new ExportData());

  const saveFile = useCallback(() => {
    message.success(type);
    if (tableRef.current) {
      const sheet = XLSX.utils.table_to_sheet(tableRef.current);
      const csv = XLSX.utils.sheet_to_csv(sheet);
      const json = XLSX.utils.sheet_to_json<any>(sheet);
      const html = XLSX.utils.sheet_to_html(sheet);
      const text = XLSX.utils.sheet_to_txt(sheet);
      show({ csv, json, html: prettyPrint(html), text })
    }
    if (exportRef.current) {
      exportRef.current.download();
    }
  }, [exportRef, type, tableRef])

  return (
    <Fragment>
      <Card title="普通表格数据导出" extra={<Button onClick={saveFile}>导出</Button>}>
        <Radio.Group value={type} options={list} optionType="button" onChange={evt => { setType(evt.target.value) }} buttonStyle="solid" />
        <Table
          components={{
            table: (pro: any) => <TableWrapper {...pro} tableRef={tableRef} />
          }}
          scroll={{ x: true }}
          columns={columns}
          dataSource={mock.list}
          rowKey="id"
          size="small"
          pagination={{ size: 'default' }}
        />
      </Card>
      <Drawer  onClose={hide} bodyStyle={{ height: '100%', padding: 0 }} visible={state.visible} placement="bottom" height="100%">
        <Row>
          <Col span={12}>
            <Editor
              height="50vh"
              theme="vs-dark"
              language="csv"
              defaultValue={state.data?.csv}
            />
          </Col>
          <Col span={12}>
            <Editor
              height="50vh"
              theme="vs-dark"
              language="json"
              defaultValue={JSON.stringify(state.data?.json ?? [], null, 2)}
            />
          </Col>
          <Col span={12}>
            <Editor
              height="50vh"
              theme="light"
              language="html"
              defaultValue={state.data?.html}
            />
          </Col>
          <Col span={12}>
            <Editor
              height="50vh"
              theme="light"
              language="html"
              defaultValue={state.data?.text}
            />
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  );
}

export default ExportLocalTableData;
