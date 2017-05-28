import { SelectedCellPosition } from "app/spread-sheet";

export module SpreadSheetAction {

  export interface SelectCell {
    sheetName: string;
    selectedCellPos: SelectedCellPosition;
  }

}
