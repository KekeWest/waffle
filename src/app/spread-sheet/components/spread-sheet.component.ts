import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetActionService, SpreadSheetStoreService } from '../services/index';
import { Sheet } from '../sheet';

@Component({
  selector: 'wf-spread-sheet',
  templateUrl: './spread-sheet.component.html',
  styleUrls: ['./spread-sheet.component.scss'],
  providers: [
    SpreadSheetDispatcherService,
    SpreadSheetActionService,
    SpreadSheetStoreService
  ]
})
export class SpreadSheetComponent implements OnInit, AfterViewInit {

  sheetOrder: string[];

  constructor(
    private spreadSheetStoreService: SpreadSheetStoreService
  ) { }

  ngOnInit() {
    this.sheetOrder = this.spreadSheetStoreService.sheetOrder;
  }

  ngAfterViewInit() {
    this.cacheTextSize();
  }

  private cacheTextSize() {
    var selectedSheet: Sheet = this.spreadSheetStoreService.selectedSheet;
  }

}
