import { Component, OnInit, HostBinding } from '@angular/core';
import { SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/base";
import { SelectedCellPosition, SpreadSheetConsts, RGBAColor } from "app/spread-sheet";
import { _ } from "app";

@Component({
  selector: 'wf-selected-cell-area',
  templateUrl: './selected-cell-area.component.html',
  styleUrls: ['./selected-cell-area.component.scss']
})
export class SelectedCellAreaComponent implements OnInit {

  @HostBinding('style.display')
  private _display: string = "none";

  @HostBinding('style.width.px')
  private _width: number;

  @HostBinding('style.height:px')
  private _height: number;

  @HostBinding('style.top.px')
  private _top: number;

  @HostBinding('style.left.px')
  private _left: number;

  @HostBinding('style.border-width.px')
  private _borderWidth: number = SpreadSheetConsts.MAX_BORDER_WIDRH;

  @HostBinding('style.border-style')
  private _borderStyle: string = "solid";

  @HostBinding('style.border-color')
  private _borderColor: string = new RGBAColor(255, 0, 0, 1).toString();

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  private _cellPosTopList: number[];

  private _cellPosLeftList: number[];

  private _currentPos: SelectedCellPosition;

  constructor(private sheetViewStoreService: SheetViewStoreService) { }

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
    this._currentPos = this.sheetViewStoreService.selectedCellPos;
    this.show();
  }

  private isShowable(): boolean {
    var startColNum: number = _.first(this._sheetViewColumnList);
    var endColNum: number = _.last(this._sheetViewColumnList);
    var startRowNum: number = _.first(this._sheetViewRowList);
    var endRowNum: number = _.last(this._sheetViewRowList);

    if (this._currentPos.startColNum > endColNum || this._currentPos.endColNum < startColNum) {
      return false;
    }

    if (this._currentPos.startRowNum > endRowNum || this._currentPos.endRowNum < startRowNum) {
      return false;
    }

    return true;
  }

  private show() {
    if (!this.isShowable()) {
      this._display = "none";
      return;
    }

  }

  

}
