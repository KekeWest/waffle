import { Component, OnInit, HostBinding } from '@angular/core';
import { SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/base";
import { SpreadSheetConsts } from "app/spread-sheet";

@Component({
  selector: 'wf-values-view',
  templateUrl: './values-view.component.html',
  styleUrls: ['./values-view.component.scss']
})
export class ValuesViewComponent implements OnInit {

  @HostBinding('style.width.px')
  private _sheetViewWidthStyle: number;

  @HostBinding('style.height.px')
  private _sheetViewHeightStyle: number;

  @HostBinding('style.top.px')
  private _sheetViewTop: number;

  @HostBinding('style.left.px')
  private _sheetViewLeft: number;

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  constructor(
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (payload: Payload) => {
        this.updateSheetViewInfo();
      }
    );
  }

  private updateSheetViewInfo() {
    this._sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
    this._sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    this._sheetViewWidthStyle = this.sheetViewStoreService.sheetViewWidth;
    this._sheetViewHeightStyle = this.sheetViewStoreService.sheetViewHeight;
    this._sheetViewTop = this.sheetViewStoreService.sheetViewTop;
    this._sheetViewLeft = this.sheetViewStoreService.sheetViewLeft;
  }

  private getTextPosTop(rowNum: number) {
    return this.sheetViewStoreService.cellPosTopList[rowNum] + SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
  }

  private getTextPosLeft(colNum: number) {
    return this.sheetViewStoreService.cellPosLeftList[colNum] + SpreadSheetConsts.MAX_BORDER_WIDRH / 2;
  }

  private getCellHeight(rowNum: number): number {
    return this.sheetViewStoreService.getRow(rowNum).height - SpreadSheetConsts.MAX_BORDER_WIDRH;
  }

}
