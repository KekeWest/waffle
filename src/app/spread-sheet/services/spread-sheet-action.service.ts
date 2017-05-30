import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetAction } from "app/spread-sheet/services";
import { SelectedCellPosition } from "app/spread-sheet";

@Injectable()
export class SpreadSheetActionService {

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) { }

  selectCell(sheetName: string, selectedCellPos: SelectedCellPosition) {
    var action: SpreadSheetAction.SelectCell = {
      sheetName: sheetName,
      selectedCellPos: selectedCellPos
    }

    this.spreadSheetDispatcherService.emit({
      eventType: "select-cell",
      data: action
    });
  }

}
