import { Injectable } from '@angular/core';
import { SheetViewDispatcherService, SheetViewAction } from "app/spread-sheet/services";
import { SelectedCellPosition } from "app/spread-sheet";

@Injectable()
export class SheetViewActionService {

  constructor(
    private sheetViewDispatcherService: SheetViewDispatcherService,
  ) { }

  changeSheetViewSize(width: number, height: number) {
    var action: SheetViewAction.ChangeSheetViewSize = {
      width: width,
      height: height
    };

    this.sheetViewDispatcherService.emit({
      eventType: "change-sheet-view-size",
      data: action
    });
  }

  scrollSheetView(scrollTop: number, scrollLeft: number) {
    var action: SheetViewAction.ScrollSheet = {
      scrollTop: scrollTop,
      scrollLeft: scrollLeft
    };

    this.sheetViewDispatcherService.emit({
      eventType: "scroll-sheet-view",
      data: action
    });
  }

}
