export const viewUrl =
  'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/url-viewer/resources/pizza-collaboration.bpmn';


/** 属性面板(右侧工具) */
export type ExampleTypes = 'url-view' | 'propertiesPanel';

export const EXAMPLES: Record<ExampleTypes, string> = {
  "url-view": 'UrlViewer',
  'propertiesPanel': '属性面板',
}

export const allExample = (Object.keys(EXAMPLES) as ExampleTypes[]).map(key => ({
  label: EXAMPLES[key],
  value: key,
  key,
}))