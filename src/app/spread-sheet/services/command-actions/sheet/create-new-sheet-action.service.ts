import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, CommandStoreService } from "app/spread-sheet/services";
import { Command, SheetEditCommand } from "app/spread-sheet/services/command-actions/command";
import { _ } from "app";
import { Sheet } from "app/spread-sheet";

@Injectable()
export class CreateNewSheetActionService {

  constructor(
    private spreadSheetDispatcherService: SpreadSheetDispatcherService
  ) { }

  createNewSheet() {
    this.spreadSheetDispatcherService.emit({
      eventType: SheetEditCommand.EDIT_EVENT,
      data: new CreateNewSheetCommand()
    });
  }

}

class CreateNewSheetCommand extends SheetEditCommand {

  private static SHEET_NAME_PREFIX: string = "Sheet";

  private sheetName: string;
  private newSheetIndex: number;

  invoke() {
    this.sheetName = this.generateNewSheetName();
    this.newSheetIndex = this._spreadSheet.sheetOrder.indexOf(this._spreadSheet.selectedSheetName) + 1;
    this._spreadSheet.sheetOrder.splice(this.newSheetIndex, 0, this.sheetName);
    this._spreadSheet.selectedSheetName = this.sheetName;
    this._spreadSheet.sheets[this.sheetName] = new Sheet(this.sheetName);
    this._spreadSheetActionService.selectSheet(this._spreadSheet.selectedSheetName);
  }

  undo() {
    if (this._spreadSheet.selectedSheetName === this.sheetName) {
      var selectSheetIndex: number = this._spreadSheet.sheetOrder.indexOf(this.sheetName);
      if (selectSheetIndex + 1 === this._spreadSheet.sheetOrder.length) {
        this._spreadSheet.selectedSheetName = this._spreadSheet.sheetOrder[selectSheetIndex - 1];
      } else {
        this._spreadSheet.selectedSheetName = this._spreadSheet.sheetOrder[selectSheetIndex + 1];
      }
      this._spreadSheetActionService.selectSheet(this._spreadSheet.selectedSheetName);
    }
    
    _.remove(this._spreadSheet.sheetOrder, (v: string) => v === this.sheetName);
    delete this._spreadSheet.sheets[this.sheetName];
  }

  redo() {
    this._spreadSheet.sheetOrder.splice(this.newSheetIndex, 0, this.sheetName);
    this._spreadSheet.sheets[this.sheetName] = new Sheet(this.sheetName);
  }

  generateNewSheetName(): string {
    var nextSheetCount: number = this._spreadSheet.sheetOrder.length + 1;
    var sheetName: string = CreateNewSheetCommand.SHEET_NAME_PREFIX + nextSheetCount;
    while(0 <= this._spreadSheet.sheetOrder.indexOf(sheetName)) {
      nextSheetCount++;
      sheetName = CreateNewSheetCommand.SHEET_NAME_PREFIX + nextSheetCount;
    }
    return sheetName;
  }

}