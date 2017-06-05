import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { SheetViewActionService, SheetViewStoreService } from "app/spread-sheet/services";
import { Payload } from "app/base";
import { SpreadSheetConsts, Sheet } from "app/spread-sheet";

@Component({
  selector: 'wf-work-sheet',
  templateUrl: './work-sheet.component.html',
  styleUrls: ['./work-sheet.component.scss'],
})
export class WorkSheetComponent implements OnInit, AfterViewInit {

  @ViewChild("workSheetView")
  private _workSheetViewRef: ElementRef;

  private _workSheetViewEl: HTMLElement;

  private _areaWidth: number;

  private _areaHeight: number;

  constructor(
    private sheetViewActionService: SheetViewActionService,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (payload: Payload) => {
        this.updateSheetViewInfo();
      }
    );
  }

  ngAfterViewInit() {
    this._workSheetViewEl = this._workSheetViewRef.nativeElement;
    var rect: ClientRect = this._workSheetViewEl.getBoundingClientRect();
    this.sheetViewActionService.changeSheetViewSize(
      rect.width,
      rect.height
    );
  }

  private updateSheetViewInfo() {
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

  @HostListener('window:resize', ['$event'])
  private onWindowResize(e: MouseEvent) {
    var rect: ClientRect = this._workSheetViewEl.getBoundingClientRect();
    this.sheetViewActionService.changeSheetViewSize(
      rect.width,
      rect.height
    );
  }

  private onScroll() {
    this.sheetViewActionService.scrollSheetView(
      this._workSheetViewEl.scrollTop,
      this._workSheetViewEl.scrollLeft
    );
  }

}
