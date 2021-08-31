declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface ElectronBridgeApi {
  ipcRenderer: Electron.IpcRenderer;
  versions: NodeJS.ProcessVersions;
}

declare interface Window {
  __ELECTRON_BRIDGE__: ElectronBridgeApi;
}