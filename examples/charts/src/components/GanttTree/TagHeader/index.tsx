import React, { SFC, useMemo } from 'react';
import { Tag, Popover } from 'antd';
import { TYPE_COLORS } from '../contant';
import styles from './index.less';

export interface TagHeaderProps {
  dataSource: any[];
}

const TagHeader: SFC<TagHeaderProps> = React.memo<TagHeaderProps>((props) => {
  const { dataSource } = props;
  const total = useMemo(() => dataSource.length, [dataSource]);

  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span className={styles.title}>
        共 <span className={total > 0 ? styles.total : ''}>{total}</span> 话题上榜
      </span>
      <div className={styles.tag_list}>
        {dataSource.map((item) => (
          <Popover content="content 占位" key={item.topicName}>
            <Tag
              color={TYPE_COLORS[item.type]}
              className={styles.tag_item}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {item.topicName}
            </Tag>
          </Popover>
        ))}
      </div>
    </div>
  );
});
export default TagHeader;
