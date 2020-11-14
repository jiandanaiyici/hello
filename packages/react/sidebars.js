// 参考: https://www.docusaurus.cn/docs/docs-introduction/#sidebar
module.exports = {
  docs: [{
    type: 'category',
    label: '基础知识',
    items: [
      'basic/overview',
      'basic/data',
      'basic/ErrorBoundaries',
      'basic/Lifecycle',
      'basic/top-api',
      'basic/HandlerBind'
    ],
  }, {
    type: 'category',
    label: 'Hooks',
    items: [
      'hooks/overview',
      'hooks/useState',
      'hooks/useEffect',
      'hooks/useContext',
      'hooks/useReducer',
      'hooks/useMemo',
      'hooks/useCallback',
      'hooks/useRef',
      'hooks/custom',
    ],
  }, {
    type: 'category',
    label: 'Router',
    items: ['router/overview'],
  }, {
    type: 'category',
    label: 'Transition',
    items: ['transition/overview'],
  }
    //  'markdown', 'docusaurus'
  ],
};

