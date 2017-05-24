import { Component, OnInit, HostBinding } from '@angular/core';
import { SheetViewStoreService } from '../../../../services/index';
import { Payload } from '../../../../../base/index';
import { SpreadSheetConsts } from '../../../../index';

@Component({
  selector: 'wf-text-board',
  templateUrl: './text-board.component.html',
  styleUrls: ['./text-board.component.scss']
})
export class TextBoardComponent implements OnInit {

  @HostBinding('style.top.px')
  private _sheetViewTop: number;

  @HostBinding('style.left.px')
  private _sheetViewLeft: number;

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

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
