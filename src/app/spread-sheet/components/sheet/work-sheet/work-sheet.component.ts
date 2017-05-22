import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ContentChild, ElementRef, HostListener } from '@angular/core';
import { Sheet, Column, Row, Cell, Border, RGBAColor, SpreadSheetConsts } from '../../../../spread-sheet/index';
import { SpreadSheetActionService, SheetViewActionService, SheetViewStoreService } from '../../../services/index';
import { SheetViewCanvasDirective } from '../../../directives/sheet/work-sheet/sheet-view-canvas.directive';
import { Payload } from '../../../../base/index';

@Component({
  selector: 'wf-work-sheet',
  templateUrl: './work-sheet.component.html',
  styleUrls: ['./work-sheet.component.scss'],
})
export class WorkSheetComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild("workSheetView")
  private _workSheetViewRef: ElementRef;

  @ViewChild(SheetViewCanvasDirective)
  private _sheetViewCanvasDirective: SheetViewCanvasDirective;

  private _areaWidth: number;

  private _areaHeight: number;

  private _sheetViewWidthStyle: number;

  private _sheetViewHeightStyle: number;

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  private _cellPosTopList: number[];

  private _cellPosLeftList: number[];

  private _sheetViewTop: number;

  private _sheetViewLeft: number;

  private _onMouseDown: boolean = false;

  private _startSelectedCellPos: { colNum: number, rowNum: number };

  constructor(
    private spreadSheetActionService: SpreadSheetActionService,
    private sheetViewActionService: SheetViewActionService,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (payload: Payload) => {
        this.updateSheetView();
      }
    );
  }

  ngAfterViewInit() {
    this.sheetViewActionService.initSheet(
      this._workSheetViewRef.nativeElement
    );
  }

  ngAfterViewChecked() {
    this._sheetViewCanvasDirective.updateCanvas();
  }

  private updateSheetView() {
    if (!this._sheetViewColumnList || !this._sheetViewRowList) {
      this._sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
      this._sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    }

    if (this.sheetViewStoreService.areaWidth < this.sheetViewStoreService.viewScrollLeft + this.sheetViewStoreService.viewWidth) {
      this._areaWidth = this.sheetViewStoreService.viewScrollLeft + this.sheetViewStoreService.viewWidth * 2;
    } else {
      this._areaWidth = this.sheetViewStoreService.areaWidth + this.sheetViewStoreService.viewWidth;
    }
    if (this.sheetViewStoreService.areaHeight < this.sheetViewStoreService.viewScrollTop + this.sheetViewStoreService.viewHeight) {
      this._areaHeight = this.sheetViewStoreService.viewScrollTop + this.sheetViewStoreService.viewHeight * 2;
    } else {
      this._areaHeight = this.sheetViewStoreService.areaHeight + this.sheetViewStoreService.viewHeight;
    }

    this._sheetViewWidthStyle = this.sheetViewStoreService.sheetViewWidth;
    this._sheetViewHeightStyle = this.sheetViewStoreService.sheetViewHeight;
    this._sheetViewTop = this.sheetViewStoreService.sheetViewTop;
    this._sheetViewLeft = this.sheetViewStoreService.sheetViewLeft;

    this.updateCellPos();
  }

  private updateCellPos() {
    this._cellPosLeftList = [];
    this._cellPosTopList = [];

    var topSum: number = 0;
    for (var rowNum of this._sheetViewRowList) {
      this._cellPosTopList.push(this._sheetViewTop + topSum);
      topSum += this.sheetViewStoreService.getRow(rowNum).height;
    }

    var leftSum: number = 0;
    for (var colNum of this._sheetViewColumnList) {
      this._cellPosLeftList.push(this._sheetViewLeft + leftSum);
      leftSum += this.sheetViewStoreService.getColumn(colNum).width;
    }
  }

  private getTextPosTop(rowNum: number) {
    return this._cellPosTopList[rowNum] + SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
  }

  private getTextPosLeft(colNum: number) {
    return this._cellPosLeftList[colNum] + SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
  }

  private getCellHeight(rowNum: number): number {
    return this.sheetViewStoreService.getRow(rowNum).height - SpreadSheetConsts.MAX_BORDER_WIDRH;
  }

  private onScroll() {
    this.sheetViewActionService.scrollSheet();
  }

  private onMouseBoardDown(e: MouseEvent) {
    this._onMouseDown = true;
    this._startSelectedCellPos = this.getMouseOverCell(e);
    this.spreadSheetActionService.selectCell(
      this.sheetViewStoreService.sheetName,
      this._startSelectedCellPos.colNum,
      this._startSelectedCellPos.rowNum,
      this._startSelectedCellPos.colNum,
      this._startSelectedCellPos.rowNum
    );
  }

  private onMouseBoardMove(e: MouseEvent) {
    if (!this._onMouseDown) {
      return;
    }
    var endSelectedCellPos: { colNum: number, rowNum: number } = this.getMouseOverCell(e);
    this.spreadSheetActionService.selectCell(
      this.sheetViewStoreService.sheetName,
      this._startSelectedCellPos.colNum,
      this._startSelectedCellPos.rowNum,
      endSelectedCellPos.colNum,
      endSelectedCellPos.rowNum
    );
  }

  @HostListener('window:mouseup', ['$event'])
  private onMouseBoardUp(e: MouseEvent) {
    this._onMouseDown = false;
  }

  private getMouseOverCell(e: MouseEvent): { colNum: number, rowNum: number } {
    var rowNum: number = this._sheetViewRowList[this._cellPosTopList.length - 1];
    for (var i: number = 0; i < this._cellPosTopList.length; i++) {
      if (e.offsetY < this._cellPosTopList[i] - this._sheetViewTop) {
        rowNum = this._sheetViewRowList[i - 1];
        break;
      }
    }

    var colNum: number = this._sheetViewColumnList[this._cellPosLeftList.length - 1];
    for (var i: number = 0; i < this._cellPosLeftList.length; i++) {
      if (e.offsetX < this._cellPosLeftList[i] - this._sheetViewLeft) {
        colNum = this._sheetViewColumnList[i - 1];
        break;
      }
    }

    return { colNum: colNum, rowNum: rowNum };
  }

}
