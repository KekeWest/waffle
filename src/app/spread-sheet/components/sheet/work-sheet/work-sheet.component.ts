import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SheetViewActionService, SheetViewStoreService } from '../../../services/index';
import { Payload } from '../../../../base/index';

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

  private onScroll() {
    this.sheetViewActionService.scrollSheet();
  }

}
