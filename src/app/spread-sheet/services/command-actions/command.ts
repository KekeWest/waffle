import { SpreadSheet } from "app/spread-sheet";

export interface Command {

  invoke();

  undo();

  redo();

}

export abstract class SheetEditCommand implements Command {

  static EVENT_PREFIX: string = "SheetEditCommand.";
  static EDIT_EVENT: string   = SheetEditCommand.EVENT_PREFIX + "edit";

  protected _spreadSheet: SpreadSheet;

  set spreadSheet(spreadSheet: SpreadSheet) {
    this._spreadSheet = spreadSheet;
  }

  abstract invoke();

  abstract undo();

  abstract redo();

}
