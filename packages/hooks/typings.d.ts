declare module '*.css';
declare module '*.less';

interface StartStop {
  start: () => void;
  stop: () => void;
}
