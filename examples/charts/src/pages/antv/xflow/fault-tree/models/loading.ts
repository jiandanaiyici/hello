import type { IModelService } from '@antv/xflow';

export namespace NsLoadingModel {
  export const id = 'LOADING_MODEL';
  export type IState = {
    loading: boolean;
  };

  export const useModel = async (model: IModelService) =>
    model.awaitModel<NsLoadingModel.IState>(id);
}
