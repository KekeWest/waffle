import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetAction } from './index';
import { SelectedCellPosition } from '../index';

@Injectable()
export class SpreadSheetActionService {

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) { }

  selectCell(sheetName: string, selectedCellPos: SelectedCellPosition) {
    var action: SpreadSheetAction.SelectCell = {
      sheetName: sheetName,
      selectedCellPos: selectedCellPos
    }

    this.spreadSheetDispatcherService.emit(
      {
        eventType: "select-cell",
        data: action
      }
    );
  }

}
