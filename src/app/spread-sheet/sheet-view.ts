import { SelectedCellPosition } from "app/spread-sheet";

export class SheetView {

  viewScrollTop: number = 0;

  viewScrollLeft: number = 0;

  sheetViewTop: number = 0;

  sheetViewLeft: number = 0;

  edgeColIndex: number;

  edgeRowIndex: number;

  areaWidth: number;

  areaHeight: number;

  sheetViewColumnList: number[] = [1];

  sheetViewRowList: number[] = [1];

  selectedCellPosition: SelectedCellPosition = new SelectedCellPosition(1, 1, 1, 1, 1, 1);

}
