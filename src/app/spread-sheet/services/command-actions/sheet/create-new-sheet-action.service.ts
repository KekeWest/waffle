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
      eventType: CommandStoreService.SHEET_EDIT_COMMAND,
      data: new CreateNewSheetCommand()
    });
  }

}

class CreateNewSheetCommand extends SheetEditCommand {

  private static SHEET_NAME_PREFIX: string = "Sheet";

  private sheetName: string;

  invoke() {
    this.sheetName = this.generateNewSheetName();
    var selectedSheetIndex: number = this._spreadSheet.sheetOrder.indexOf(this._spreadSheet.selectedSheetName);
    this._spreadSheet.sheetOrder.splice(selectedSheetIndex + 1, 0, this.sheetName);
    this._spreadSheet.selectedSheetName = this.sheetName;
    this._spreadSheet.sheets[this.sheetName] = new Sheet(this.sheetName);
  }

  undo() {
    delete this._spreadSheet.sheets[this.sheetName];
  }

  redo() {
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