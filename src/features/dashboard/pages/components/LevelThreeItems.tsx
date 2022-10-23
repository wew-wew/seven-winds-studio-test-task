import React from 'react';
import { RowData } from '../../../../utility/dataTypes';
import RowItem from './RowItem';

const LevelThreeItems = ({ data, parentItem }: { data: RowData[]; parentItem: RowData }) => {
  return (
    <ul className="tree-nested-items">
      {data
        .filter(levelThreeItem => levelThreeItem.parent == parentItem.id)
        .map(levelThreeItem => (
          <RowItem
            rowData={levelThreeItem}
            isFirst={data.filter(levelThreeItem => levelThreeItem.parent == parentItem.id).findIndex(item => item == levelThreeItem) == 0}
            key={levelThreeItem.id}
          />
        ))}
    </ul>
  );
};

export default LevelThreeItems;
