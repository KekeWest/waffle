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

}
