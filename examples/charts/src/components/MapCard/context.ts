import { createContext, useContext } from 'react';

export const MapCardContext = createContext<MapCardContentType>({
  config: {},
  setConfig: () => {},
} as MapCardContentType);

export const useMapContext = () => useContext(MapCardContext);
