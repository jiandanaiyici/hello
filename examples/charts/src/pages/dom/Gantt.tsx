import React, { useEffect, useMemo } from 'react';
import { Card, Tabs, Spin } from 'antd';
import GanttTree from '@/components/GanttTree';
import { GanttTreeData } from '@/components/GanttTree/interface';
import useQueryData from '@/hooks/useQueryData';
import { useSetState } from 'ahooks';
import { ProjectDataInfo } from './interface';
import { queryGanttListService, queryProjectListService } from './service';
import { transformToDataSource } from './helper';

const { TabPane } = Tabs;

const Gantt = () => {
  const [state, setState] = useSetState<ProjectDataInfo>({} as ProjectDataInfo);
  const [projectList, queryProject, projectLoading] = useQueryData<ProjectDataInfo[]>(
    queryProjectListService,
    [],
  );

  const [ganttData, queryGantt, loading] = useQueryData<GanttTreeData[]>(queryGanttListService, []);

  useEffect(() => {
    queryProject();
  }, []);

  useEffect(() => {
    if (projectList.length > 0) {
      /** 默认第一个 */
      setState(projectList[0]);
    }
  }, [projectList]);

  useEffect(() => {
    if (state.projectId && state.endDate && state.startDate) {
      queryGantt(state);
    }
  }, [state]);

  const dataSource = useMemo(
    () => transformToDataSource(ganttData, state.startDate, state.endDate),
    [ganttData, state.startDate, state.endDate],
  );

  return (
    <Card>
      <Spin spinning={projectLoading}>
        <Tabs
          style={{ background: '#fff' }}
          activeKey={state.projectId}
          onChange={(key) => {
            const activeData = projectList.find((item) => item.projectId === key);
            setState(activeData as ProjectDataInfo);
          }}
        >
          {projectList.map((item) => (
            <TabPane key={item.projectId} tab={item.name} />
          ))}
        </Tabs>
      </Spin>

      <GanttTree
        loading={loading}
        // @ts-ignore
        dataSource={dataSource}
        startDate={state.startDate}
        endDate={state.endDate}
      />
    </Card>
  );
};

export default Gantt;
