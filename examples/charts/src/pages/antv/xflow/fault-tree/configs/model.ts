import { createModelServiceConfig } from '@antv/xflow';
import type { IModelService } from '@antv/xflow';
import { NsLoadingModel } from '../models/loading';

export const useModelServiceConfig = createModelServiceConfig((config) => {
  config.registerModel((registry, graph) => {
    return registry.registerModel<NsLoadingModel.IState>({
      id: NsLoadingModel.id,
      getInitialValue: () => {
        return {
          loading: false,
        };
      },
    });
  });
});

export const useLoadingState = async (contextService?: IModelService) => {
  const ctx = await contextService?.awaitModel<NsLoadingModel.IState>(
    NsLoadingModel.id
  );
  return ctx?.getValidValue();
};
