import { Injectable } from '@angular/core';
import { SheetViewDispatcherService, SheetViewAction } from "app/spread-sheet/services";
import { SelectedCellPosition } from "app/spread-sheet";

@Injectable()
export class SheetViewActionService {

  constructor(
    private sheetViewDispatcherService: SheetViewDispatcherService,
  ) { }

  initSheet(workSheetViewEl: HTMLElement) {
    var action: SheetViewAction.InitSheet = {
      workSheetViewEl: workSheetViewEl
    }

    this.sheetViewDispatcherService.emit(
      {
        eventType: "init-sheet",
        data: action
      }
    );
  }

  scrollSheet() {
    this.sheetViewDispatcherService.emit(
      {
        eventType: "scroll-sheet"
      }
    );
  }

  selectCell(startColNum: number, startRowNum: number, endColNum: number, endRowNum: number, clickColNum: number, clickRowNum: number) {
    var action: SheetViewAction.SelectCell = {
      selectedCellPos: new SelectedCellPosition(startColNum, startRowNum, endColNum, endRowNum, clickColNum, clickRowNum)
    }

    this.sheetViewDispatcherService.emit(
      {
        eventType: "select-cell",
        data: action
      }
    );
  }

}
