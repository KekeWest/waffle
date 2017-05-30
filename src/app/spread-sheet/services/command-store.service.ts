import { Injectable } from '@angular/core';
import { SpreadSheetStoreService, SpreadSheetDispatcherService } from "app/spread-sheet/services";
import { Payload } from "app/base";
import { SheetEditCommand, Command } from "app/spread-sheet/services/command-actions";
import { _ } from "app";

@Injectable()
export class CommandStoreService {

  public static SHEET_EDIT_COMMAND: string = "sheet-edit-command";

  private _undoCommandStack: Command[] = [];

  private _redoCommandStack: Command[] = [];

  constructor(
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService
  ) {
    this.spreadSheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case CommandStoreService.SHEET_EDIT_COMMAND:
            this.invokeSheetEditCommand(<SheetEditCommand>payload.data);
            break;
        }
      }
    );
  }

  private invokeSheetEditCommand(command: SheetEditCommand) {
    command.spreadSheet = this.spreadSheetStoreService.spreadSheet;
    command.invoke();
    this._redoCommandStack = [];
    this._undoCommandStack.push(command);
  }

  private undo() {
    if (_.isEmpty(this._undoCommandStack)) {
      return;
    }
    var command: Command = this._undoCommandStack.pop();
    command.undo();
    this._redoCommandStack.push(command);
  }

  private redo() {
    if (_.isEmpty(this._redoCommandStack)) {
      return;
    }
    var command: Command = this._redoCommandStack.pop();
    command.redo();
    this._undoCommandStack.push(command);
  }

}
