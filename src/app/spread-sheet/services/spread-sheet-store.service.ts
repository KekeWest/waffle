import { Injectable } from '@angular/core';
import { Emitter, Payload } from '../../base/index';
import { SpreadSheet, Sheet, Column, Row, Cell, RGBAColor, SelectedCellPosition } from '../../spread-sheet/index';
import { SpreadSheetDispatcherService, SpreadSheetAction } from './index';

@Injectable()
export class SpreadSheetStoreService extends Emitter<Payload> {

  private _spreadSheet: SpreadSheet;

  private _selectedCellPos: { [sheetName: string]: SelectedCellPosition } = {};

  constructor(private spreadSheetDispatcherService: SpreadSheetDispatcherService) {
    super();
    this.spreadSheetDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case "select-cell":
            this.selectSheet(<SpreadSheetAction.SelectCell>payload.data);
            break;
        }
      }
    );

    this.getInitialSpreadSheet();
  }

  get sheetOrder(): string[] {
    return this._spreadSheet.sheetOrder;
  }

  get selectedSheetName(): string {
    return this._spreadSheet.selectedSheetName;
  }

  get selectedSheet(): Sheet {
    return this._spreadSheet.sheets[this.selectedSheetName];
  }

  getInitialSpreadSheet() {
    this._spreadSheet = new SpreadSheet("book1", { "sheet1": new Sheet() }, ["sheet1"], "sheet1");

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

    this.setCell("sheet1", 200, 200, cell1);
    this.setCell("sheet1", 3, 3, cell2);
    this.setCell("sheet1", 5, 3, cell3);
    this.setCell("sheet1", 5, 4, cell4);
    this.setCell("sheet1", 6, 3, cell4);
    // for (var i = 1; i < 10000; i++) {
    //   for (var j = 1; j < 10000; j++) {
    //     this.setCell("sheet1", i, j, cell3);
    //   }
    // }
  }

  getSheet(sheetName: string): Sheet {
    return this._spreadSheet.sheets[sheetName];
  }

  getSelectedCellPosition(sheetName: string): SelectedCellPosition {
    return this._selectedCellPos[sheetName];
  }

  setCell(sheetName: string, colIndex: number, rowIndex: number, cell: Cell) {
    var colObj: { [rowIndex: number]: Cell } = this.getColumnObject(sheetName, colIndex, true);
    colObj[rowIndex] = cell;
  }

  private getColumnObject(sheetName: string, colIndex: number, create: boolean): { [rowIndex: number]: Cell } {
    var sheet: Sheet = this.getSheet(sheetName);
    var colObj: { [rowIndex: number]: Cell } = sheet.cells[colIndex];

    if (colObj) {
      return colObj;
    }

    if (create) {
      colObj = {};
      sheet.cells[colIndex] = colObj;
      return colObj;
    }

    return null;
  }

  private selectSheet(action: SpreadSheetAction.SelectCell) {
    this._selectedCellPos[action.sheetName] = action.selectedCellPos;
    this.emit({eventType: "update-selected-cell", data: action.sheetName});
  }

}
