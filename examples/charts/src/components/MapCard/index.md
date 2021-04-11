## 描述

| 属性          |        描述        |         类型          |
| ------------- | :----------------: | :-------------------: |
| `className`   |   容器 className   |       `string`        |
| `style`       |     容器 样式      | `React.CSSProperties` |
| `bodyClsName` | 内容区域 className |       `string`        |
| `bodyStyle`   |   内容区域 样式    | `React.CSSProperties` |

## context

- 提供一个全局使用通用的地图 `context: useMapCardContext`

| 属性       | 描述 |                  类型 |
| ---------- | :--: | --------------------: |
| `state`    |      |           `StateType` |
| `setState` |      | `(StateType) => void` |

## 相关链接

- [全屏 screenfull](https://github.com/sindresorhus/screenfull.js)
- [cloneElement](https://medium.com/@kylpo/all-about-reacts-cloneelement-964853391337)
- [When should I be using React.cloneElement vs this.props.children?](https://stackoverflow.com/questions/37521798/when-should-i-be-using-react-cloneelement-vs-this-props-children)


## FAQ

- `Function` 组件定义 `defaultProps`
