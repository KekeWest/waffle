
import { Column, Row, Cell, SelectedCellPosition, SheetView } from "app/spread-sheet";

export class Sheet {

  columns: { [colIndex: number]: Column } = {};

  rows: { [rowIndex: number]: Row } = {};

  cells: { [colIndex: number]: { [rowIndex: number]: Cell } } = {};

  defaultColumn: Column = new Column();

  defaultRow: Row = new Row();

  defaultCell: Cell = new Cell();

  sheetView: SheetView = new SheetView();

  constructor(public name: string) { }

}
