import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SheetViewActionService, SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/base";
import { SpreadSheetConsts } from "app/spread-sheet";

@Component({
  selector: 'wf-work-sheet',
  templateUrl: './work-sheet.component.html',
  styleUrls: ['./work-sheet.component.scss'],
})
export class WorkSheetComponent implements OnInit, AfterViewInit {

  @ViewChild("workSheetView")
  private _workSheetViewRef: ElementRef;

  private _areaWidth: number;

  private _areaHeight: number;

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  constructor(
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
    this.sheetViewActionService.initSheet(this._workSheetViewRef.nativeElement);
  }

  private updateSheetView() {
    this._sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
    this._sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;

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

  private onScroll() {
    this.sheetViewActionService.scrollSheet();
  }

}
