import { SelectedCellPosition } from '../index';

export module SheetViewAction {

  export interface InitSheet {
    workSheetViewEl: HTMLElement;
  }

  export interface SelectCell {
    selectedCellPos: SelectedCellPosition;
  }

}
