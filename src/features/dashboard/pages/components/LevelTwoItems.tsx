import React from 'react';
import { RowData } from '../../../../utility/dataTypes';
import LevelThreeItems from './LevelThreeItems';
import RowItem from './RowItem';

const LevelTwoItems = ({ data, rootItem }: { data: RowData[]; rootItem: RowData }) => {
  return (
    <ul className="tree-nested-items">
      {data
        .filter(levelTwoItem => levelTwoItem.parent == rootItem.id)
        .map(levelTwoItem => (
          <div key={levelTwoItem.id} style={{ width: '100%'}}>
            <RowItem
              rowData={levelTwoItem}
              isFirst={data.filter(levelTwoItem => levelTwoItem.parent == rootItem.id).findIndex(item => item == levelTwoItem) == 0}
            />
            <LevelThreeItems 
              parentItem={levelTwoItem}
              data={data.filter(levelThreeItem => levelThreeItem.parent == levelTwoItem.id)}
            />
          </div>
        ))}
    </ul>
  );
};

export default LevelTwoItems;
