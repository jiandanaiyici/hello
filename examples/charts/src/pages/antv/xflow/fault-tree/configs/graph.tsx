/** 设置画布配置 */
import { createGraphConfig, IEvent } from '@antv/xflow';
import type { IModelService, IGraphCommandService } from '@antv/xflow';
import type { EventArgs } from '@antv/x6/es/graph/events';
import type { Graph as X6Graph } from '@antv/x6';

export const useGraphConfig = createGraphConfig((config) => {
  const nodeClickEvent: IEvent<'node:click'> = {
    eventName: 'node:click',
    callback: (eventArgs, commandService) => {
      console.log('node:click', commandService, eventArgs);
    },
  };

  const nodeDoubleClick: IEvent<'node:dblclick'> = {
    eventName: 'node:dblclick',
    callback: (
      _x6Event: EventArgs[keyof EventArgs],
      cmd: IGraphCommandService,
      _modelService: IModelService,
      _graph: X6Graph
    ) => {
      console.log(cmd, 'dbclick');
    },
  };

  config.setX6Config({
    /** 历史记录 */
    history: true,
    grid: {
      visible: true,
      size: 20,
    },
    // height: 500,
    // autoResize: true,
    background: {
      color: '#0ae',
      opacity: 0.7,
      size: 'revert',
      // image: 'https://source.unsplash.com/random/1200x800',
      image:
        'https://images.unsplash.com/photo-1463171515643-952cee54d42a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      // 'https://images.unsplash.com/photo-1647292942430-c712d72b676c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0Nzc3MTY4MQ&ixlib=rb-1.2.1&q=80&w=1200',
    },

    scaling: {
      min: 0.1,
      max: 2,
    },
  });

  /**
   * @TODO
   * 1. 注册全局事件
   * 2. 添加节点
   * 3. 添加自定义边
   */
  // config.mergeX6Config(options);

  /** 添加事件 */
  config.setEvents([nodeClickEvent, nodeDoubleClick]);
});
