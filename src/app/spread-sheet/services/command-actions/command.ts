import { SpreadSheet } from "app/spread-sheet";

export interface Command {

  invoke();

  undo();

  redo();

}

export abstract class SheetEditCommand implements Command {

  protected _spreadSheet: SpreadSheet;

  set spreadSheet(spreadSheet: SpreadSheet) {
    this._spreadSheet = spreadSheet;
  }

  abstract invoke();

  abstract undo();

  abstract redo();

}
