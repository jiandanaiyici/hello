import React, { Fragment, FC } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export interface TableFooterProps extends CheckboxInt {
  total?: number;
}

export interface CheckboxInt {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
}

const TableFooter: FC<TableFooterProps> = props => {
  const { total } = props;

  return (
    <Fragment>
      {/* <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        indeterminate={props.indeterminate}
      >
        全选
      </Checkbox>
      &nbsp; */}
      {typeof total === 'number' && total > 0 && <span>{total}项</span>}
    </Fragment>
  );
};

export default TableFooter;
