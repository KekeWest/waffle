import { Injectable } from '@angular/core';
import { SheetViewDispatcherService, SheetViewAction } from './index';
import { SelectedCellPosition } from '../index';

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

  selectCell(startColNum: number, startRowNum: number, endColNum: number, endRowNum: number) {
    var action: SheetViewAction.SelectCell = {
      selectedCellPos: {
        startColNum: startColNum,
        startRowNum: startRowNum,
        endColNum: endColNum,
        endRowNum: endRowNum
      }
    }

    this.sheetViewDispatcherService.emit(
      {
        eventType: "select-cell",
        data: action
      }
    );
  }

}
