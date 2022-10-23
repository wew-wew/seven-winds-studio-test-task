export interface NewRowData {
  title: string // Наименование работ
  unit?: string // Ед. изм.
  quantity?: number // Количество
  unitPrice?: number // Цена за ед.
  price: number // Стоимость

  parent: number | null // id уровня, в котором находится (либо null для первого уровня)
  type: RowDataType.level | RowDataType.row
}

export interface RowData extends NewRowData {
  id: number
}

export enum RowDataType {
  level = 'level',
  row = 'row',
}