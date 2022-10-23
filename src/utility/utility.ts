import { NewRowData, RowData } from './dataTypes';

// функция для сохранения строки
export function saveRow(rowData: NewRowData, storage: RowData[]) {
  const index = Math.max(...storage.map(v => v.id), 0) + 1;
  const row: RowData = { id: index, ...rowData };

  storage.push(row);
  return {
    current: row,
    changed: recalculation(row.parent, storage),
  };
}

// функция для изменения строки
export function editRow(row: RowData, storage: RowData[]) {
  const index = storage.findIndex(v => v.id === row.id);

  // Удаляем редактируемый ряд с нужным ID и заменяем его на изменённый ряд:
  storage.splice(index, 1, row);

  return {
    current: row,
    changed: recalculation(row.parent, storage),
  };
}

export function recalculation(parentID: number | null, storage: RowData[]) {
  const rows = [...storage];
  const changedRows: RowData[] = [];

  // Если уровень - нулевой, возвращается пустой массив (говорим, что изменений нет):
  if (parentID == null) return changedRows;

  // Находим индекс родителя в списке (в соответствии с его ID):
  let currentParentIndex = rows.findIndex(v => v.id === parentID);

  // Если родитель не найден в списке рядов, возвращается пустой массив (говорим, что изменений нет):
  if (currentParentIndex === -1) return changedRows;

  do {
    // Выбираем текущего родителя:
    const currentParent = rows[currentParentIndex];

    // Выбираем из списка дочерние объекты этого родителя:
    const children = rows.filter(v => v.parent == currentParent.id);

    // Суммируем стоимость работ по всем выбранным дочерним объектам:
    const newPrice = children.reduce((acc, v) => acc + v.price, 0);

    // Если цена изменилась:
    if (currentParent.price !== newPrice) {
      // Меняем цену родителя на сумму цен дочерних объектов:
      rows[currentParentIndex] = {...rows[currentParentIndex], price: newPrice};

      // Добавляем этот ряд в список изменённых рядов:
      changedRows.push(rows[currentParentIndex]);

      // Теперь выбираем родительский объект по отношению к текущему родительскому объекту:
      currentParentIndex = rows.findIndex(v => v.id === currentParent.parent);
      continue;
    }

    break;
  } while (currentParentIndex !== -1);

  return changedRows;
}
