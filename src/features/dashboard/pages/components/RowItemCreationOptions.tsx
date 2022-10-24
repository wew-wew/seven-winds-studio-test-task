import React from 'react';
import folderIcon1 from '../../../../assets/folderIcon1.png';
import folderIcon2 from '../../../../assets/folderIcon2.png';
import documentIcon from '../../../../assets/documentIcon.png';
import { levelClassTypeSelector } from './RowItem.utils';
import { useDispatch, useSelector } from 'react-redux';
import { addRow, setNewRowAdded } from '../../redux/reducer';
import { newRowData } from '../../../../utility/constants';
import { RowData, RowDataType } from '../../../../utility/dataTypes';
import { RootState } from '../../../../reduxUtils/store';

const RowItemCreationOptions = ({ isFirst = false, rowData }: { isFirst?: boolean; rowData: RowData }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.rows.data);
  const createNewRow = (level: number) => {
    dispatch(setNewRowAdded(true));
    switch (level) {
    case 1:
      dispatch(addRow({ ...newRowData, parent: null, type: RowDataType.level }));
      break;
    case 2:
      dispatch(
        addRow({
          ...newRowData,
          parent: rowData.parent === null ? rowData.id : rowData.parent,
          type: RowDataType.level,
        })
      );
      break;
    case 3:
      dispatch(
        addRow({
          ...newRowData,
          parent: data.find(item => item.id === rowData.parent)?.parent === null ? rowData.id : rowData.parent,
          type: RowDataType.row,
        })
      );
      break;
    }
  };
  
  switch (levelClassTypeSelector({ isFirst, rowData }).level) {
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

export default RowItemCreationOptions;
