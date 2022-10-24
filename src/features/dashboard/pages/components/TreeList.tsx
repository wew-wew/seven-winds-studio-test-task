import React, { useEffect } from 'react';
import RowItem from './RowItem';
import LevelTwoItems from './LevelTwoItems';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../reduxUtils/store';
import { calculatePrices } from '../../redux/reducer';

const TreeList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.rows.data);

  useEffect(() => {
    dispatch(calculatePrices());
  }, []);

  return (
    <div className="table-container">
      <div className="flex-row-100">
        <div className="table-header-cell table-cell-w110">Уровень</div>
        <div className="table-header-cell table-cell-wmax">Наименование работ</div>
        <div className="table-header-cell table-cell-w200">Ед. изм.</div>
        <div className="table-header-cell table-cell-w200">Количество</div>
        <div className="table-header-cell table-cell-w200">Цена за ед.</div>
        <div className="table-header-cell table-cell-w200">Стоимость</div>
      </div>
      {data
        .filter(rootItem => rootItem.parent === null)
        .map(rootItem => (
          <div key={rootItem.id} >
            <RowItem rowData={rootItem}/>
            <ul className="tree-nested-items">
              <LevelTwoItems data={data} rootItem={rootItem} />
            </ul>
          </div>
        ))}
    </div>
  );
};

export default TreeList;
