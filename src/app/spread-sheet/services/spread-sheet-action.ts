import { SelectedCellPosition } from '../index';

export module SpreadSheetAction {

  export interface SelectCell {
    sheetName: string;
    selectedCellPos: SelectedCellPosition;
  }

}
