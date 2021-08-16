export interface PreviewImageListPropsInt {
  /** 读取方式 */
  readType: 'fileReader' | 'url';
  /** 文件列表 */
  files: File[];
  /** 是否显示预览 todo: 是否展示轮播图 */
  preview?: boolean; //  | 'lunbo'
  /** 预览标题 */
  previewTitle?: React.ReactNode;
  /** 显示操作按钮 */
  actions?: React.ReactNode;
}

export interface SingleImageInt extends File {
  /** 唯一ID: 通过 uuidv1生成 */
  uid?: string;

  /** 图片地址 */
  url: string;
}

export interface ImageItemPropsInt extends SingleImageInt {
  /** 样式 */
  style?: React.CSSProperties;

  /** 显示操作按钮 */
  actions?: React.ReactNode;

  key: string;

  /** 预览查看事件 */
  onShow?: (data: any) => void;
}
