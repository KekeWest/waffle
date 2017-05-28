
import { SelectedCellPosition } from "app/spread-sheet";

export module SheetViewAction {

  export interface InitSheet {
    workSheetViewEl: HTMLElement;
  }

  export interface SelectCell {
    selectedCellPos: SelectedCellPosition;
  }

}
