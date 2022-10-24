import React, { useState } from 'react';
import { RowData, RowDataType } from '../../../../utility/dataTypes';
import RowItemValues from './RowItemValues';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../reduxUtils/store';
import { newRowData } from '../../../../utility/constants';
import { addRow, setNewRowAdded } from '../../redux/reducer';
import { levelClassTypeSelector } from './RowItem.utils';
import RowItemCreationOptions from './RowItemCreationOptions';

const RowItem = ({ isFirst = false, rowData }: { isFirst?: boolean; rowData: RowData }) => {
  const [showCreationOptions, setShowCreationOptions] = useState(false);
  const data = useSelector((state: RootState) => state.rows.data);
  const dispatch = useDispatch();

  const formattedPrice = (Math.round(rowData.price * 100) / 100)
    .toString()
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <li className="flex-row-100">
      <div
        className={levelClassTypeSelector({ isFirst, rowData }).iconClassName}
        onMouseOver={() => setShowCreationOptions(true)}
        onMouseOut={() => setShowCreationOptions(false)}
      >
        {!showCreationOptions ? (
          <img className="icon" src={levelClassTypeSelector({ isFirst, rowData }).icon} />
        ) : (
          <RowItemCreationOptions isFirst={isFirst} rowData={rowData} />
        )}
      </div>
      <RowItemValues rowData={rowData} />
      <div className="table-cell table-cell-w200">{formattedPrice}</div>
    </li>
  );
};

export default RowItem;
