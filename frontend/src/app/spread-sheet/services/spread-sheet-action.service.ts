import { Injectable } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetAction } from "app/spread-sheet/services";
import { SelectedCellPosition, SpreadSheet, Sheet, Cell, RGBAColor } from "app/spread-sheet";

@Injectable()
export class SpreadSheetActionService {

  static EVENT_PREFIX: string = "SpreadSheetActionService.";
  static LOAD_SPREADSHEET_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "load-spreadsheet";
  static SELECT_SHEET_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "select-sheet";
  static SELECT_CELL_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "select-cell";
  static UNDO_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "undo";
  static REDO_EVENT: string = SpreadSheetActionService.EVENT_PREFIX + "redo";

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) { }

  undo() {
    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.UNDO_EVENT
    });
  }

  redo() {
    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.REDO_EVENT
    });
  }

  selectSheet(sheetName: string) {
    var action: SpreadSheetAction.SelectSheet = {
      sheetName: sheetName
    };

    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.SELECT_SHEET_EVENT,
      data: action
    });
  }

  selectCell(sheetName: string, startColNum: number, startRowNum: number, endColNum: number, endRowNum: number, clickColNum: number, clickRowNum: number) {
    var action: SpreadSheetAction.SelectCell = {
      sheetName: sheetName,
      selectedCellPos: new SelectedCellPosition(startColNum, startRowNum, endColNum, endRowNum, clickColNum, clickRowNum)
    };

    this.spreadSheetDispatcherService.emit({
      eventType: SpreadSheetActionService.SELECT_CELL_EVENT,
      data: action
    });
  }

  loadSpreadSheet() {
    var spreadSheet: SpreadSheet = new SpreadSheet("book1", { "sheet1": new Sheet("sheet1") }, ["sheet1"], "sheet1");

    var cell1: Cell = new Cell();
    cell1.value = "200 200";

    var cell2: Cell = new Cell();
    cell2.value = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    cell2.border.borderBottom = true;
    cell2.border.borderBottomWidth = 3;
    cell2.border.borderBottomStyle = "solid";
    cell2.border.borderBottomColor = new RGBAColor(255, 0, 0, 1);
    cell2.border.borderRight = true;
    cell2.border.borderRightWidth = 2;
    cell2.border.borderRightStyle = "solid";
    cell2.border.borderRightColor = new RGBAColor(0, 255, 0, 1);
    cell2.backgroundColor = new RGBAColor(255, 255, 0, 1);

    var cell3: Cell = new Cell();
    cell3.value = "KKKKKKKKKKKK";
    cell3.border.borderBottom = true;
    cell3.border.borderBottomWidth = 3;
    cell3.border.borderBottomStyle = "solid";
    cell3.border.borderBottomColor = new RGBAColor(255, 0, 0, 1);
    cell3.border.borderRight = true;
    cell3.border.borderRightWidth = 3;
    cell3.border.borderRightStyle = "solid";
    cell3.border.borderRightColor = new RGBAColor(0, 255, 0, 1);
    cell3.backgroundColor = new RGBAColor(255, 255, 0, 1);

    var cell4: Cell = new Cell();
    cell4.value = "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK";
    cell4.border.borderBottom = true;
    cell4.border.borderBottomWidth = 2;
    cell4.border.borderBottomStyle = "solid";
    cell4.border.borderBottomColor = new RGBAColor(0, 0, 255, 1);
    cell4.border.borderRight = true;
    cell4.border.borderRightWidth = 2;
    cell4.border.borderRightStyle = "solid";
    cell4.border.borderRightColor = new RGBAColor(0, 0, 255, 1);
    cell4.backgroundColor = new RGBAColor(255, 255, 0, 1);

    spreadSheet.sheets["sheet1"].cells[200] = {};
    spreadSheet.sheets["sheet1"].cells[200][200] = cell1;
    spreadSheet.sheets["sheet1"].cells[3] = {};
    spreadSheet.sheets["sheet1"].cells[3][3] = cell2;
    spreadSheet.sheets["sheet1"].cells[5] = {};
    spreadSheet.sheets["sheet1"].cells[5][3] = cell3;
    spreadSheet.sheets["sheet1"].cells[5][4] = cell4;
    spreadSheet.sheets["sheet1"].cells[6] = {};
    spreadSheet.sheets["sheet1"].cells[6][3] = cell4;

    var jsonstr: string = JSON.stringify(spreadSheet);
    spreadSheet = new SpreadSheet().fromJSON(JSON.parse(jsonstr));

    var action: SpreadSheetAction.LoadSpreadSheet = {
      spreadSheet: spreadSheet
    };

    setTimeout(() => {
      this.spreadSheetDispatcherService.emit({
        eventType: SpreadSheetActionService.LOAD_SPREADSHEET_EVENT,
        data: action
      });
    }, 1000);
  }

}
