import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetAction } from "app/spread-sheet/services";
import { SelectedCellPosition } from "app/spread-sheet";

@Injectable()
export class SpreadSheetActionService {

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) { }

  selectSheet(sheetName: string) {
    var action: SpreadSheetAction.SelectSheet = {
      sheetName: sheetName
    };

    this.spreadSheetDispatcherService.emit({
      eventType: "select-sheet",
      data: action
    });
  }

  selectCell(sheetName: string, startColNum: number, startRowNum: number, endColNum: number, endRowNum: number, clickColNum: number, clickRowNum: number) {
    var action: SpreadSheetAction.SelectCell = {
      sheetName: sheetName,
      selectedCellPos: new SelectedCellPosition(startColNum, startRowNum, endColNum, endRowNum, clickColNum, clickRowNum)
    };

    this.spreadSheetDispatcherService.emit({
      eventType: "select-cell",
      data: action
    });
  }

}
