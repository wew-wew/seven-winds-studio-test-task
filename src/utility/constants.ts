import { NewRowData, RowDataType } from './dataTypes';

export const newRowData: NewRowData = {
  title: '',
  unit: '',
  quantity: 0,
  unitPrice: 0,
  price: 0,

  parent: null,
  type: RowDataType.level,
};
