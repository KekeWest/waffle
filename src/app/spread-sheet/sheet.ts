
import { Column, Row, Cell, SelectedCellPosition } from "app/spread-sheet";

export class Sheet {

  columns: { [colIndex: number]: Column } = {};

  rows: { [rowIndex: number]: Row } = {};

  cells: { [colIndex: number]: { [rowIndex: number]: Cell } } = {};

  defaultColumn: Column = new Column();

  defaultRow: Row = new Row();

  defaultCell: Cell = new Cell();

  selectedCellPosition: SelectedCellPosition = new SelectedCellPosition(1, 1, 1, 1, 1, 1);

  constructor(public name: string) { }

}
