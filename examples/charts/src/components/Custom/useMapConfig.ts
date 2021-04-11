import { useEffect } from 'react';
import { Scene, IMapConfig } from '@antv/l7';

const useMapConfig = (sceneInts: Scene | null, map: Partial<IMapConfig>) => {
  /** 重置缩放等级 */
  useEffect(() => {
    if (sceneInts && map.zoom) {
      sceneInts.setZoom(map.zoom);
    }
  }, [map.zoom]);

  /** 重置样式 */
  useEffect(() => {
    if (sceneInts && map.style) {
      sceneInts.setMapStyle(map.style);
    }
  }, [JSON.stringify(map.style)]);

  /** 重置 */
  useEffect(() => {
    if (sceneInts && map.pitch) {
      sceneInts.setPitch(map.pitch);
    }
  }, [map.pitch]);

  useEffect(() => {
    if (sceneInts && map.rotation) {
      sceneInts.setRotation(map.rotation);
    }
  }, [map.rotation]);

  /** 重置中心点 */
  useEffect(() => {
    if (sceneInts && map.center) {
      sceneInts.setCenter(map.center);
    }
  }, [JSON.stringify(map.center)]);
};

export default useMapConfig;
