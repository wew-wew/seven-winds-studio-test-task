import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewRowData, RowData, RowDataType } from '../../../utility/dataTypes';
import { editRow, saveRow } from '../../../utility/utility';

export interface RowsState {
  data: RowData[];
  newRowAdded: boolean;
}

const levelData1: RowData = {
  id: 0,
  type: RowDataType.level,
  parent: null,
  title: 'Южная строительная площадка',
  price: 0,
};

const levelData2: RowData = {
  id: 1,
  type: RowDataType.level,
  parent: 0,
  title: 'Фундаментальные работы',
  price: 0,
};

const rowData1: RowData = {
  id: 2,
  type: RowDataType.row,
  parent: 1,
  title: 'Статья работы № 1',
  unit: 'м3',
  quantity: 1750,
  unitPrice: 108.07,
  price: 0,
};

const rowData2: RowData = {
  id: 3,
  type: RowDataType.row,
  parent: 1,
  title: 'Статья работы № 2',
  unit: 'л',
  quantity: 1200,
  unitPrice: 850,
  price: 0,
};

const initialState: RowsState = {
  data: [levelData1, levelData2, rowData1, rowData2],
  newRowAdded: false,
};

export const slice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    calculatePrices: state => {
      // Вычисляем стоимость для каждой строки:
      state.data.forEach((row, index) => {
        if (row.type === RowDataType.row) {
          const price = row.quantity! * row.unitPrice!;
          state.data[index].price = price;
        }
      });

      // Находим список родительских объектов:
      const parentIDs: (number | null)[] = [];
      state.data.forEach(row => {
        if (!parentIDs.includes(row.parent)) {
          parentIDs.push(row.parent);
        }
      });

      // Для каждого родителя вычисляем сумму стоимостей для дочерних объектов:
      parentIDs.forEach(parentID => {
        if (parentID != null) {
          state.data[parentID].price = state.data
            .filter(row => row.parent === parentID)
            .reduce((acc, v) => acc + v.price, 0);
        }
      });
    },
    changeRow: (state, { payload }: PayloadAction<RowData>) => {
      editRow(payload, state.data).changed.forEach(changedRow => {
        const index = state.data.findIndex(row => row.id === changedRow.id);
        state.data.splice(index, 1, changedRow);
      });
    },
    addRow: (state, { payload }: PayloadAction<NewRowData>) => {
      saveRow(payload, state.data).changed.forEach(changedRow => {
        const index = state.data.findIndex(row => row.id === changedRow.id);
        state.data.splice(index, 1, changedRow);
      });
    },
    setNewRowAdded: (state, { payload }: PayloadAction<boolean>) => {
      state.newRowAdded = payload;
    },
  },
});

export const { calculatePrices, addRow, changeRow, setNewRowAdded } = slice.actions;

export default slice.reducer;
