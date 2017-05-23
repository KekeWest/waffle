import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { SheetViewStoreService, SpreadSheetActionService } from '../../../../services/index';
import { Payload } from '../../../../../base/index';

@Component({
  selector: 'wf-mouse-event-board',
  templateUrl: './mouse-event-board.component.html',
  styleUrls: ['./mouse-event-board.component.scss']
})
export class MouseEventBoardComponent implements OnInit {

  @HostBinding('style.width.px')
  private _sheetViewWidth: number;

  @HostBinding('style.height.px')
  private _sheetViewHeight: number;

  @HostBinding('style.top.px')
  private _sheetViewTop: number;

  @HostBinding('style.left.px')
  private _sheetViewLeft: number;

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  private _cellPosTopList: number[];

  private _cellPosLeftList: number[];

  private _onMouseDown: boolean = false;

  private _startSelectedCellPos: { colNum: number, rowNum: number };

  constructor(
    private sheetViewStoreService: SheetViewStoreService,
    private spreadSheetActionService: SpreadSheetActionService) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (payload: Payload) => {
        this.updateSheetView();
      }
    );
  }

  private updateSheetView() {
    this._sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
    this._sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    this._cellPosTopList = this.sheetViewStoreService.cellPosTopList;
    this._cellPosLeftList = this.sheetViewStoreService.cellPosLeftList;
    this._sheetViewWidth = this.sheetViewStoreService.sheetViewWidth;
    this._sheetViewHeight = this.sheetViewStoreService.sheetViewHeight;
    this._sheetViewTop = this.sheetViewStoreService.sheetViewTop;
    this._sheetViewLeft = this.sheetViewStoreService.sheetViewLeft;
  }

  @HostListener('mousedown', ['$event'])
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

  @HostListener('mousemove', ['$event'])
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
