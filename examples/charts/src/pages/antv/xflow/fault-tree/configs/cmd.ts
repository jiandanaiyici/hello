import { createCmdConfig, NsGraph, NsNodeCmd } from '@antv/xflow';

export const useCmdConfig = createCmdConfig((config, proxy) => {
  // @ts-ignore
  config.setRegisterHookFn((hooks) => {
    hooks.updateNode.registerHook({
      name: '',
      handler: async (args: NsNodeCmd.UpdateNode.IArgs) => {
        args.updateNodeService = () => {
          console.log('自定义的 hooks');
          return Promise.resolve(args.nodeConfig as NsGraph.INodeConfig);
        };
      },
    });
  });
});
