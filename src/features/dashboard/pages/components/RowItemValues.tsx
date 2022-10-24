import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../reduxUtils/store';
import { RowData, RowDataType } from '../../../../utility/dataTypes';
import { changeRow, setNewRowAdded } from '../../redux/reducer';

const RowItemValues = ({ rowData }: { rowData: RowData }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.rows.data);
  const newRowAdded = useSelector((state: RootState) => state.rows.newRowAdded);

  const [editMode, setEditMode] = useState(newRowAdded && Math.max(...data.map(item => item.id), 0) === rowData.id );

  const [title, setTitle] = useState(rowData.title);
  const [unit, setUnit] = useState(rowData.unit);
  const [quantity, setQuantity] = useState(rowData.quantity);
  const [unitPrice, setUnitPrice] = useState(rowData.unitPrice);

  const onSubmit = () => {
    setEditMode(false);
    if (newRowAdded) dispatch(setNewRowAdded(false));
    
    const changedRowData: RowData = {
      ...rowData,
      title,
      unit,
      quantity,
      unitPrice,
      price: rowData.type === RowDataType.row ? quantity! * unitPrice! : 0,
    };

    dispatch(changeRow(changedRowData));
  };

  const enterInputListener=(event: React.KeyboardEvent<HTMLFormElement>)=> {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  const formStyle = {
    display: 'flex',
    flex: 1,
  };

  return (
    <>
      {!editMode ? (
        <>
          <div className="table-cell table-cell-wmax" onDoubleClick={e => setEditMode(true)}>
            {rowData.title === '' ? 'Наименование работ' : rowData.title}
          </div>
          <div className="table-cell table-cell-w200" onDoubleClick={e => setEditMode(true)}>
            {rowData.type === RowDataType.row ? rowData.unit === '' ? 'Ед. изм.' : rowData.unit : ''}
          </div>
          <div className="table-cell table-cell-w200" onDoubleClick={e => setEditMode(true)}>
            {rowData.type === RowDataType.row ? rowData.quantity : ''}
          </div>
          <div className="table-cell table-cell-w200" onDoubleClick={e => setEditMode(true)}>
            {rowData.type === RowDataType.row ? rowData.unitPrice : ''}
          </div>
        </>
      ) : (
        <form style={formStyle} onSubmit={onSubmit} onKeyDown={event => enterInputListener(event)}>
          <div className="table-cell table-cell-wmax">
            <input
              placeholder="Наименование работ"
              type="text"
              className="table-input table-cell-wmax"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="table-cell table-cell-w200">
            {rowData.type === RowDataType.row ? (
              <input
                placeholder="Ед. изм."
                type="text"
                className="table-input table-cell-w200"
                value={unit}
                onChange={event => setUnit(event.target.value)}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="table-cell table-cell-w200">
            {rowData.type === RowDataType.row ? (
              <input
                placeholder="Количество"
                type="number"
                className="table-input table-cell-w200"
                value={quantity}
                onChange={event => setQuantity(parseFloat(event.target.value))}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="table-cell table-cell-w200">
            {rowData.type === RowDataType.row ? (
              <input
                placeholder="Цена за ед."
                type="number"
                className="table-input table-cell-w200"
                value={unitPrice}
                onChange={event => setUnitPrice(parseFloat(event.target.value))}
              />
            ) : (
              <></>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default RowItemValues;
