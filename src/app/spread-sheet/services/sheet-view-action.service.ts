import { Injectable } from '@angular/core';
import { SheetViewDispatcherService } from './index';
import { SelectedCellPosition } from '../index';

@Injectable()
export class SheetViewActionService {

  constructor(
    private sheetViewDispatcherService: SheetViewDispatcherService,
  ) { }

  initSheet(workSheetViewEl: HTMLElement) {
    var action: InitSheetAction = {
      workSheetViewEl: workSheetViewEl
    }

    this.sheetViewDispatcherService.emit(
      "init-sheet",
      action
    );
  }

  scrollSheet() {
    this.sheetViewDispatcherService.emit(
      "scroll-sheet"
    );
  }

}

export interface InitSheetAction {
  workSheetViewEl: HTMLElement;
}
