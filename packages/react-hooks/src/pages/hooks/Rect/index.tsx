import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Form, Slider, Button, Divider } from 'antd';

import useResizeRect from '@/hooks/useResizeRect';

import styles from './index.less';
import useMouseEvent from '@/hooks/useMouseEvent';
import { useCallback } from 'react';

interface MoveData {
  x?: number;
  y?: number;
}

const layout = {
  wrapperCol: { span: 20 },
  labelCol: { span: 4 },
};

const getMarks = (str: string) => ({
  100: {
    style: {
      color: '#f50',
    },
    label: <b>{str}</b>,
  },
});

export default () => {
  const [ref, rect] = useResizeRect<HTMLDivElement>();
  const [state, setState] = useState<DOMRect>();
  const [box, setBox] = useState<{
    padding?: number;
    margin?: number;
    border?: number;
  }>({
    padding: 10,
    margin: 1,
    border: 1,
  });
  const [move, setMove] = useState<MoveData>({
    x: 0,
    y: 0,
  });

  useMouseEvent(ref, 'mousedown', (event: any) => {
    setMove({ x: event.offsetX, y: event.offsetY });
  });

  useEffect(() => {
    setState(ref.current?.getBoundingClientRect());
  }, [ref, move, box]);

  const reset = useCallback(() => {
    setMove({ x: 0, y: 0 });
    setBox({ padding: 0, margin: 0, border: 0 });
  }, [setBox, setMove]);

  return (
    <Fragment>
      <div className={styles.box}>
        <div
          ref={ref}
          className={styles.wrapper}
          style={{
            transform: `translateX(${move.x}px)`,
            margin: box.margin,
            padding: box.padding,
            borderWidth: box.border,
          }}
        >
          <div className={styles.content} />
        </div>
      </div>
      <Form size="small" style={{ backgroundColor: '#fff' }}>
        <Button size="large" type="primary" onClick={reset}>
          Reset
        </Button>
        <Divider />
        <Form.Item label="padding">
          <Slider
            style={{ width: '100%' }}
            value={box.padding}
            tooltipVisible
            // marks={getMarks('padding')}
            onChange={(val: any) => {
              setBox(prevBox => ({
                padding: val,
                margin: prevBox.margin,
              }));
            }}
          />
        </Form.Item>
        <Form.Item label="margin">
          <Slider
            max={12}
            min={0}
            step={1}
            style={{ width: '100%' }}
            value={box.margin}
            tooltipVisible
            onChange={(val: any) => {
              setBox({ margin: val });
            }}
          />
        </Form.Item>
        <Form.Item label="border">
          <Slider
            max={12}
            min={0}
            step={1}
            style={{ width: '100%' }}
            value={box.border}
            tooltipVisible
            onChange={(val: any) => {
              setBox({ border: val });
            }}
          />
        </Form.Item>
      </Form>
      <Divider />
      <Row gutter={32}>
        <Col span={12}>
          <Card size="small" title="useResizeRect">
            <Divider plain>
              <a
                href="https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver"
                target="_blank"
              >
                查看ResizeObserver
              </a>
            </Divider>
            <Divider plain>没有办法获取通过 transform的偏移量</Divider>
            <pre>{JSON.stringify(rect, null, 2)}</pre>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="getBoundingClientRect">
            <Divider plain>
              <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect">
                getBoundingClientRect
              </a>
            </Divider>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
