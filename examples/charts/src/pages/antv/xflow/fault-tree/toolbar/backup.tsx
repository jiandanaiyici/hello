import { createToolbarConfig } from '@antv/xflow';

export const getExtraDependencies = async (modelServier: IModelService) => {
  return [
    await MODELS.GRAPH_SCALE.getModel(modelServier),
    await MODELS.GRAPH_FULLSCREEN.getModel(modelServier),
  ];
};

export const useToolbarConfig = createToolbarConfig((toolbarConfig) => {
  /** 生产 toolbar item */
  toolbarConfig.setToolbarModelService(
    async (
      toolbarModel: IToolbarModel,
      modelService: IModelService,
      toDispose: DisposableCollection
    ) => {
      // extra 可参考: https://github.com/antvis/XFlow/blob/a5acdf4358983332a906e02d76e9ebd4002ed815/packages/xflow-extension/src/canvas-scale-toolbar/config.tsx#L123
      const graphScale = await MODELS.GRAPH_SCALE.useValue(modelService);
      const updateExtraModel = async (
        value: boolean | MODELS.GRAPH_SCALE.IState
      ) => {
        console.log(value, '>>>>>>>>zoomFactor');
        toolbarModel.setValue((m) => {
          m.extraGroups = FaultTreeToolbarConfig.getExtraToolbarItems({
            zoomFactor:
              typeof value === 'object'
                ? value.zoomFactor
                : graphScale.zoomFactor,
            fullscreen: typeof value === 'boolean' ? value : true,
          });
        });
      };
      const extraModels = await FaultTreeToolbarConfig.getExtraDependencies(
        modelService
      );

      const extraSubscriptions = extraModels.map((model) => {
        return model.watch(updateExtraModel);
      });
      toDispose.pushAll(extraSubscriptions);
    }
  );
});
