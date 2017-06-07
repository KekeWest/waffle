import { SpreadSheet } from "app/spread-sheet";
import { SpreadSheetActionService } from "app/spread-sheet/services";

export interface Command {

  invoke();

  undo();

  redo();

}

export abstract class SheetEditCommand implements Command {

  static EVENT_PREFIX: string = "SheetEditCommand.";
  static EDIT_EVENT: string   = SheetEditCommand.EVENT_PREFIX + "edit";

  protected _spreadSheetActionService: SpreadSheetActionService;
  protected _spreadSheet: SpreadSheet;

  set spreadSheet(spreadSheet: SpreadSheet) {
    this._spreadSheet = spreadSheet;
  }

  set spreadSheetActionService(spreadSheetActionService: SpreadSheetActionService) {
    this._spreadSheetActionService = spreadSheetActionService;
  }

  abstract invoke();

  abstract undo();

  abstract redo();

}
