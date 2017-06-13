import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { SpreadSheetStoreService, SpreadSheetActionService } from "app/spread-sheet/services";
import { Payload } from "app/base";
import { CreateNewSheetActionService } from "app/spread-sheet/services/command-actions";

@Component({
  selector: 'wf-sheet-tab',
  templateUrl: './sheet-tab.component.html',
  styleUrls: ['./sheet-tab.component.scss'],
  providers: [
    CreateNewSheetActionService
  ]
})
export class SheetTabComponent implements OnInit, AfterViewChecked {

  private _sheetOrder: string[];

  private _needScroll: boolean = false;

  constructor(
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private createNewSheetActionService: CreateNewSheetActionService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this._sheetOrder = this.spreadSheetStoreService.sheetOrder;
  }

  ngAfterViewChecked() {
    if (this._needScroll) {
      var width: number = (<HTMLElement>this.el.nativeElement).querySelector(".nav-tabs").getBoundingClientRect().width;
      (<HTMLElement>this.el.nativeElement).querySelector("tabset").scrollLeft = width;
      this._needScroll = false;
    }
  }

  private createNewSheet() {
    this.createNewSheetActionService.createNewSheet();
    this._needScroll = true;
  }

  private selectSheet(sheetName: string) {
    if (this.isActiveTab(sheetName)) {
      return;
    }
    this.spreadSheetActionService.selectSheet(sheetName);
  }

  private isActiveTab(sheetName: string): boolean {
    return sheetName === this.spreadSheetStoreService.selectedSheetName;
  }

}
