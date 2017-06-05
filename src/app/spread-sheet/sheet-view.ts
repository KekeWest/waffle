import { SelectedCellPosition } from "app/spread-sheet";

export class SheetView {

  scrollTop: number = 0;

  scrollLeft: number = 0;

  startColNum: number = 1;

  startRowNum: number = 1;

  selectedCellPosition: SelectedCellPosition = new SelectedCellPosition(1, 1, 1, 1, 1, 1);

}
