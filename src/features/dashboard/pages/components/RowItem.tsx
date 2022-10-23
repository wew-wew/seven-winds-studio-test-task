import React, { useState } from 'react';
import folderIcon1 from '../../../../theme/folderIcon1.png';
import folderIcon2 from '../../../../theme/folderIcon2.png';
import documentIcon from '../../../../theme/documentIcon.png';
import { RowData, RowDataType } from '../../../../utility/dataTypes';
import RowItemValues from './RowItemValues';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { newRowData } from '../../../../utility/constants';
import { addRow } from '../../redux/reducer';

const RowItem = ({ isFirst = false, rowData }: { isFirst?: boolean; rowData: RowData }) => {
  const levelClassTypeSelector = () => {
    let iconClassName = 'tree-item';
    let icon;
    let level;

    if (rowData.parent === null) {
      icon = folderIcon1;
      level = 1;
    } else if (rowData.type === 'row') {
      iconClassName += ' tree-item-nested tree-item-nested-level2';
      if (isFirst) iconClassName += ' tree-item-nested-first';
      icon = documentIcon;
      level = 3;
    } else {
      if (isFirst) iconClassName += ' tree-item-nested tree-item-nested-level1 tree-item-nested-first';
      else iconClassName = 'tree-item tree-item-nested-level1 tree-item-nested-same-level';
      icon = folderIcon2;
      level = 2;
    }
    return { iconClassName, icon, level };
  };

  const [showCreationOptions, setShowCreationOptions] = useState(false);
  const data = useSelector((state: RootState) => state.rows.data);
  const dispatch = useDispatch();

  const createNewRow = (level: number) => {
    switch (level) {
    case 1:
      dispatch(addRow({ ...newRowData, parent: null, type: RowDataType.level }));
      break;
    case 2:
      dispatch(
        addRow({ ...newRowData, parent: rowData.parent == null ? rowData.id : rowData.parent, type: RowDataType.level }),
      );
      break;
    case 3:
      dispatch(
        addRow({
          ...newRowData,
          parent: data.find(item => item.id == rowData.parent)?.parent == null ? rowData.id : rowData.parent,
          type: RowDataType.row,
        }),
      );
      break;
    }
  };

  const CreationOptions = () => {
    switch (levelClassTypeSelector().level) {
    case 1:
      return (
        <div className="flex-row creation-options-container">
          <img className="icon" src={folderIcon1} onClick={() => createNewRow(1)} />
          <img className="icon" src={folderIcon2} onClick={() => createNewRow(2)} />
        </div>
      );
    case 2:
      return (
        <div className="flex-row creation-options-container">
          <img className="icon" src={folderIcon2} onClick={() => createNewRow(2)} />
          <img className="icon" src={documentIcon} onClick={() => createNewRow(3)} />
        </div>
      );
    case 3:
      return (
        <div className="flex-row creation-options-container">
          <img className="icon" src={documentIcon} onClick={() => createNewRow(3)} />
        </div>
      );
    default:
      return <></>;
    }
  };

  return (
    <li className="flex-row-100">
      <div
        className={levelClassTypeSelector().iconClassName}
        onMouseOver={() => setShowCreationOptions(true)}
        onMouseOut={() => setShowCreationOptions(false)}
      >
        {!showCreationOptions ? <img className="icon" src={levelClassTypeSelector().icon} /> : <CreationOptions />}
      </div>
      <RowItemValues rowData={rowData} />
      <div className="table-cell table-cell-w200">{rowData.price}</div>
    </li>
  );
};

export default RowItem;
