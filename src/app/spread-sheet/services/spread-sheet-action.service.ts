import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService } from './index';
import { SelectedCellPosition } from '../index';

@Injectable()
export class SpreadSheetActionService {

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) { }

  selectCell(sheetName: string, startColNum: number, startRowNum: number, endColNum: number, endRowNum: number) {
    var action: SelectCellAction = {
      sheetName: sheetName,
      selectedCellPos: {
        startColNum: startColNum,
        startRowNum: startRowNum,
        endColNum: endColNum,
        endRowNum: endRowNum
      }
    }

    this.spreadSheetDispatcherService.emit(
      "select-cell",
      action
    );
  }

}

export interface SelectCellAction {
  
  sheetName: string;

  selectedCellPos: SelectedCellPosition;

}