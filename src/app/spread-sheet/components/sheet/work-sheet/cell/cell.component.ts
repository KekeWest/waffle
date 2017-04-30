import { Component, Input, HostBinding, OnInit, AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Column, Row, Cell, RGBAColor } from '../../../../../spread-sheet/index';
import { SheetViewStoreService } from '../../../../services/index';

@Component({
  selector: 'wf-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, AfterViewInit, OnDestroy {

  private static defaultBorderWidth: number = 1;

  private static defaultBorderStyle: string = "solid";

  private static defaultBorderColor: string = (new RGBAColor(233, 233, 233, 1)).toString();

  @Input()
  private colNum: number;

  @Input()
  private rowNum: number;

  private _cell: Cell;

  private _column: Column;

  private _row: Row;

  private _valueEl: HTMLElement;

  private _valueMaxWidth: number;

  @HostBinding('style.width.px')
  private width: number;

  @HostBinding('style.height.px')
  private height: number;

  @HostBinding('style.border-bottom-width.px')
  private borderBottomWidth: number;

  @HostBinding('style.border-bottom-style')
  private borderBottomStyle: string;

  @HostBinding('style.border-bottom-color')
  private borderBottomColor: string;

  @HostBinding('style.border-right-width.px')
  private borderRightWidth: number;

  @HostBinding('style.border-right-style')
  private borderRightStyle: string;

  @HostBinding('style.border-right-color')
  private borderRightColor: string;

  @HostBinding('style.background-color')
  private backGroundColor: string;


  constructor(
    private elementRef: ElementRef,
    private changeDetectionRef: ChangeDetectorRef,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.updateGridData();
    this.updateCellSize();
    this.updateCellBorder();
    this.updateBackgroundColor();
  }

  ngAfterViewInit() {
    this._valueEl = this.elementRef.nativeElement.querySelector(".value");
    this.updateValueInnerWidth();
    this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy() {

  }

  private updateGridData() {
    this._cell = this.sheetViewStoreService.getCell(this.colNum, this.rowNum);
    this._column = this.sheetViewStoreService.getColumn(this.colNum);
    this._row = this.sheetViewStoreService.getRow(this.rowNum);
  }

  private updateCellSize() {
    this.width = this._column.width;
    this.height = this._row.height;
  }

  private updateCellBorder() {
    this.updateCellBorderBottom();
    this.updateCellBorderRight();
  }

  private updateCellBorderBottom() {
    if (this._cell.border.borderBottom) {
      this.borderBottomWidth = this._cell.border.borderBottomWidth;
      this.borderBottomStyle = this._cell.border.borderBottomStyle;
      this.borderBottomColor = this._cell.border.borderBottomColor.toString();
      return;
    }

    if (this._row.border.borderBottom) {
      this.borderBottomWidth = this._row.border.borderBottomWidth;
      this.borderBottomStyle = this._row.border.borderBottomStyle;
      this.borderBottomColor = this._row.border.borderBottomColor.toString();
      return;
    }

    this.borderBottomWidth = CellComponent.defaultBorderWidth;
    this.borderBottomStyle = CellComponent.defaultBorderStyle;
    this.borderBottomColor = CellComponent.defaultBorderColor;
  }

  private updateCellBorderRight() {
    if (this._cell.border.borderRight) {
      this.borderRightWidth = this._cell.border.borderRightWidth;
      this.borderRightStyle = this._cell.border.borderRightStyle;
      this.borderRightColor = this._cell.border.borderRightColor.toString();
      return;
    }

    if (this._column.border.borderRight) {
      this.borderRightWidth = this._column.border.borderRightWidth;
      this.borderRightStyle = this._column.border.borderRightStyle;
      this.borderRightColor = this._column.border.borderRightColor.toString();
      return;
    }

    this.borderRightWidth = CellComponent.defaultBorderWidth;
    this.borderRightStyle = CellComponent.defaultBorderStyle;
    this.borderRightColor = CellComponent.defaultBorderColor;
  }

  private updateBackgroundColor() {
    if (this._cell.backgroundColor) {
      this.backGroundColor = this._cell.backgroundColor.toString();
      return;
    }

    if (this._column.backgroundColor) {
      this.backGroundColor = this._column.backgroundColor.toString();
      return;
    }

    if (this._row.backgroundColor) {
      this.backGroundColor = this._row.backgroundColor.toString();
      return;
    }
  }

  private updateValueInnerWidth() {
    if (!this._valueEl) {
      return;
    }

    this._valueMaxWidth = this.width;
    var maxColNum = this.sheetViewStoreService.sheetViewColumnList[this.sheetViewStoreService.sheetViewColumnList.length - 1];
    for (var i = this.colNum + 1; i < maxColNum; i++) {
      if (this.sheetViewStoreService.getCell(i, this.rowNum).value) {
        break;
      }
      this._valueMaxWidth += this.sheetViewStoreService.getColumn(i).width;
    }
  }

}
