import { Column } from './column';
import { Row } from './row';
import { Cell } from './cell';

export class Sheet {

  columns: { [colIndex: number]: Column } = {};

  rows: { [rowIndex: number]: Row } = {};

  cells: { [colIndex: number]: { [rowIndex: number]: Cell } } = {};

  defaultColumn: Column = new Column();

  defaultRow: Row = new Row();

  defaultCell: Cell = new Cell();

}
