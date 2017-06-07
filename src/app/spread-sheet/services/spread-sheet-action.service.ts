import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetAction } from "app/spread-sheet/services";
import { SelectedCellPosition } from "app/spread-sheet";

@Injectable()
export class SpreadSheetActionService {

  static EVENT_PREFIX: string = "SpreadSheetActionService.";
  static SELECT_SHEET: string = SpreadSheetActionService.EVENT_PREFIX + "select-sheet";
  static SELECT_CELL: string  = SpreadSheetActionService.EVENT_PREFIX + "select-cell";

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) { }

  selectSheet(sheetName: string) {
    var action: SpreadSheetAction.SelectSheet = {
      sheetName: sheetName
    };

    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.SELECT_SHEET,
      data: action
    });
  }

  selectCell(sheetName: string, startColNum: number, startRowNum: number, endColNum: number, endRowNum: number, clickColNum: number, clickRowNum: number) {
    var action: SpreadSheetAction.SelectCell = {
      sheetName: sheetName,
      selectedCellPos: new SelectedCellPosition(startColNum, startRowNum, endColNum, endRowNum, clickColNum, clickRowNum)
    };

    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.SELECT_CELL,
      data: action
    });
  }

}
