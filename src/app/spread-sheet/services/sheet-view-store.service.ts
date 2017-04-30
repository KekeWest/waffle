import { Injectable } from '@angular/core';
import { EventEmitterBase } from '../../utils/event-emitter-base';
import { SheetViewDispatcherService } from './sheet-view-dispatcher.service';
import { InitSheetAction } from './sheet-view-action.service';
import { Sheet, Column, Row, Cell } from '../../spread-sheet/index';

@Injectable()
export class SheetViewStoreService extends EventEmitterBase {

  private _edgeColIndex: number;

  private _edgeRowIndex: number;

  private _sheet: Sheet;

  private _workSheetViewEl: HTMLElement;

  private _viewWidth: number;

  private _viewHeight: number;

  private _viewScrollTop: number;

  private _viewScrollLeft: number;

  private _areaWidth: number;

  private _areaHeight: number;

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  private _sheetViewWidth: number;

  private _sheetViewHeight: number;

  private _sheetViewTop: number;

  private _sheetViewLeft: number;

  constructor(
    private sheetViewDispatcherService: SheetViewDispatcherService
  ) {
    super();
    this.sheetViewDispatcherService.register(
      (actionType: string, action: any) => {
        switch(actionType) {
          case "init-sheet":
            this.initSheet(<InitSheetAction>action);
            break;
          case "scroll-sheet":
            this.updateSheetView();
            break;
        }
      }
    );
  }

  set sheet(sheet: Sheet) {
      this._sheet = sheet;
  }

  get sheetViewColumnList(): number[] {
    return this._sheetViewColumnList;
  }

  get sheetViewRowList(): number[] {
    return this._sheetViewRowList;
  }

  get viewWidth(): number {
    return this._viewWidth;
  }

  get viewHeight(): number {
    return this._viewHeight;
  }

  get viewScrollTop(): number {
    return this._viewScrollTop;
  }

  get viewScrollLeft(): number {
    return this._viewScrollLeft;
  }

  get areaWidth(): number {
    return this._areaWidth;
  }

  get areaHeight(): number {
    return this._areaHeight;
  }

  get sheetViewWidth(): number {
    return this._sheetViewWidth;
  }

  get sheetViewHeight(): number {
    return this._sheetViewHeight;
  }

  get sheetViewTop(): number {
    return this._sheetViewTop;
  }

  get sheetViewLeft(): number {
    return this._sheetViewLeft;
  }

  getColumn(colIndex: number): Column {
    var col: Column = this._sheet.columns[colIndex];
    if (!col) {
      return this._sheet.defaultColumn;
    }
    return col;
  }

  getRow(rowIndex: number): Row {
    var row: Row = this._sheet.rows[rowIndex];
    if (!row) {
      return this._sheet.defaultRow;
    }
    return row;
  }

  getCell(colIndex: number, rowIndex: number): Cell {
    var rowObj: { [rowIndex: number]: Cell } = this._sheet.cells[colIndex];

    if (!rowObj) {
      return this._sheet.defaultCell;
    }

    var cell: Cell = rowObj[rowIndex];
    if (!cell) {
      return this._sheet.defaultCell;
    }

    return cell;
  }

  private initSheet(action: InitSheetAction) {
    this._workSheetViewEl = action.workSheetViewEl;

    this.initAreaRect();
    this.initSheetView();
    this.emit("init-sheet-view");
  }

  private initAreaRect() {
    this.initEdgeIndex();
    this._areaWidth = 0;
    this._areaHeight = 0;

    var col: Column;
    for (var colIdx: number = 1; colIdx <= this._edgeColIndex; colIdx++) {
      col = this._sheet.columns[colIdx];
      if (col) {
        this._areaWidth += col.width;
      } else {
        this._areaWidth += this._sheet.defaultColumn.width;
      }
    }

    var row: Row;
    for (var rowIdx: number = 1; rowIdx <= this._edgeRowIndex; rowIdx++) {
      row = this._sheet.rows[rowIdx];
      if (row) {
        this._areaHeight += row.height;
      } else {
        this._areaHeight += this._sheet.defaultRow.height;
      }
    }
  }

  private initEdgeIndex() {
    this._edgeColIndex = 1;
    this._edgeRowIndex = 1;

    var i: number;

    var colIndexes: string[] = Object.keys(this._sheet.columns);
    for (var colIdx of colIndexes) {
      i = Number(colIdx);
      if (this._edgeColIndex < i) {
        this._edgeColIndex = i;
      }
    }

    var rowIndexes: string[] = Object.keys(this._sheet.rows);
    for (var rowIdx of rowIndexes) {
      i = Number(rowIdx);
      if (this._edgeRowIndex < i) {
        this._edgeRowIndex = i;
      }
    }

    var colIndexes: string[] = Object.keys(this._sheet.cells);
    for (var colIdx of colIndexes) {
      i = Number(colIdx);
      if (this._edgeColIndex < i) {
        this._edgeColIndex = i;
      }

      var rowIndexes: string[] = Object.keys(this._sheet.cells[i]);
      for (var rowIdx of rowIndexes) {
        i = Number(rowIdx);
        if (this._edgeRowIndex < i) {
          this._edgeRowIndex = i;
        }
      }
    }
  }

  private initSheetView() {
    this.updateViewRect();
    this._workSheetViewEl.scrollTop = 0;
    this._workSheetViewEl.scrollLeft = 0;
    this._viewScrollTop = 0;
    this._viewScrollLeft = 0;
    this._sheetViewWidth = 0;
    this._sheetViewHeight = 0;
    this._sheetViewTop = 0;
    this._sheetViewLeft = 0;
    this._sheetViewColumnList = [];
    this._sheetViewRowList = [];

    var col: Column;
    for (var colIdx: number = 1; colIdx <= this._edgeColIndex; colIdx++) {
      col = this._sheet.columns[colIdx];
      if (col) {
        this._sheetViewWidth += col.width;
      } else {
        this._sheetViewWidth += this._sheet.defaultColumn.width;
      }
      this._sheetViewColumnList.push(colIdx);

      if (this._sheetViewWidth > this._viewWidth) {
        break;
      }
    }

    var row: Row;
    for (var rowIdx: number = 1; rowIdx <= this._edgeRowIndex; rowIdx++) {
      row = this._sheet.rows[rowIdx];
      if (row) {
        this._sheetViewHeight += row.height;
      } else {
        this._sheetViewHeight += this._sheet.defaultRow.height;
      }
      this._sheetViewRowList.push(rowIdx);

      if (this._sheetViewHeight > this._viewHeight) {
        break;
      }
    }
  }

  private updateViewRect() {
    var rect: any = this._workSheetViewEl.getBoundingClientRect();
    this._viewWidth = rect.width;
    this._viewHeight = rect.height;
  }

  private updateSheetView() {
    this._viewScrollTop = this._workSheetViewEl.scrollTop;
    this._viewScrollLeft = this._workSheetViewEl.scrollLeft;

    if (this._viewScrollTop - this._sheetViewTop <= 0) {
      this.moveRowUp();
    } else if ((this._sheetViewTop + this._sheetViewHeight) - (this._viewScrollTop + this._viewHeight) <= 0) {
      this.moveRowDown();
    }
    if (this._viewScrollLeft - this._sheetViewLeft <= 0) {
      this.moveColumnLeft();
    } else if ((this._sheetViewLeft + this._sheetViewWidth) - (this._viewScrollLeft + this._viewWidth) <= 0) {
      this.moveColumnRight();
    }

    this.emit("update-sheet-view");
  }

  private moveRowUp() {
    var row: Row;

    for (var rowIdx: number = this._sheetViewRowList[0] - 1; rowIdx >= 1; rowIdx--) {
      row = this._sheet.rows[rowIdx];
      if (row) {
        this._sheetViewHeight += row.height;
        this._sheetViewTop -= row.height;
      } else {
        this._sheetViewHeight += this._sheet.defaultRow.height;
        this._sheetViewTop -= this._sheet.defaultRow.height;
      }
      this._sheetViewRowList.unshift(rowIdx);
      if (this._viewScrollTop - this._sheetViewTop > 0) {
        break;
      }
    }

    var rowIdx: number = null;
    var rowHeight: number = null;
    while((this._sheetViewTop + this._sheetViewHeight) - (this._viewScrollTop + this._viewHeight) > 0) {
      rowIdx = this._sheetViewRowList.pop();
      row = this._sheet.rows[rowIdx];
      if (row) {
        rowHeight = row.height;
      } else {
        rowHeight = this._sheet.defaultRow.height;
      }
      this._sheetViewHeight -= rowHeight;
      if (this._sheetViewRowList.length === 0) {
        break;
      }
    }
    if (rowIdx) {
      this._sheetViewRowList.push(rowIdx);
      this._sheetViewHeight += rowHeight;
    }
  }

  private moveRowDown() {
    var row: Row;

    for (var rowIdx: number = this._sheetViewRowList[this._sheetViewRowList.length - 1] + 1; rowIdx <= 1048576; rowIdx++) {
      row = this._sheet.rows[rowIdx];
      if (row) {
        this._sheetViewHeight += row.height;
      } else {
        this._sheetViewHeight += this._sheet.defaultRow.height;
      }
      this._sheetViewRowList.push(rowIdx);
      if ((this._sheetViewTop + this._sheetViewHeight) - (this._viewScrollTop + this._viewHeight) > 0) {
        break;
      }
    }

    var rowIdx: number = null;
    var rowHeight: number = null;
    while(this._viewScrollTop - this._sheetViewTop > 0) {
      rowIdx = this._sheetViewRowList.shift();
      row = this._sheet.rows[rowIdx];
      if (row) {
        rowHeight = row.height;
      } else {
        rowHeight = this._sheet.defaultRow.height;
      }
      this._sheetViewHeight -= rowHeight;
      this._sheetViewTop += rowHeight;
      if (this._sheetViewRowList.length === 0) {
        break;
      }
    }
    if (rowIdx) {
      this._sheetViewRowList.unshift(rowIdx);
      this._sheetViewHeight += rowHeight;
      this._sheetViewTop -= rowHeight;
    }
  }

  private moveColumnLeft() {
    var col: Column;

    for (var colIdx: number = this._sheetViewColumnList[0] - 1; colIdx >= 1; colIdx--) {
      col = this._sheet.columns[colIdx];
      if (col) {
        this._sheetViewWidth += col.width;
        this._sheetViewLeft -= col.width;
      } else {
        this._sheetViewWidth += this._sheet.defaultColumn.width;
        this._sheetViewLeft -= this._sheet.defaultColumn.width;
      }
      this._sheetViewColumnList.unshift(colIdx);
      if (this._viewScrollLeft - this._sheetViewLeft > 0) {
        break;
      }
    }

    var colIdx: number = null;
    var colWidth: number = null;
    while((this._sheetViewLeft + this._sheetViewWidth) - (this._viewScrollLeft + this._viewWidth) > 0) {
      colIdx = this._sheetViewColumnList.pop();
      col = this._sheet.columns[colIdx];
      if (col) {
        colWidth = col.width;
      } else {
        colWidth = this._sheet.defaultColumn.width;
      }
      this._sheetViewWidth -= colWidth;
      if (this._sheetViewColumnList.length === 0) {
        break;
      }
    }
    if (colIdx) {
      this._sheetViewColumnList.push(colIdx);
      this._sheetViewWidth += colWidth;
    }
  }

  private moveColumnRight() {
    var col: Column;

    for (var colIdx: number = this._sheetViewColumnList[this._sheetViewColumnList.length - 1] + 1; colIdx <= 16384; colIdx++) {
      col = this._sheet.columns[colIdx];
      if (col) {
        this._sheetViewWidth += col.width;
      } else {
        this._sheetViewWidth += this._sheet.defaultColumn.width;
      }
      this._sheetViewColumnList.push(colIdx);
      if ((this._sheetViewLeft + this._sheetViewWidth) - (this._viewScrollLeft + this._viewWidth) > 0) {
        break;
      }
    }

    var colIdx: number = null;
    var colWidth: number = null;
    while(this._viewScrollLeft - this._sheetViewLeft > 0) {
      colIdx = this._sheetViewColumnList.shift();
      col = this._sheet.columns[colIdx];
      if (col) {
        colWidth = col.width;
      } else {
        colWidth = this._sheet.defaultColumn.width;
      }
      this._sheetViewWidth -= colWidth;
      this._sheetViewLeft += colWidth;
      if (this._sheetViewColumnList.length === 0) {
        break;
      }
    }
    if (colIdx) {
      this._sheetViewColumnList.unshift(colIdx);
      this._sheetViewWidth += colWidth;
      this._sheetViewLeft -= colWidth;
    }
  }

}
