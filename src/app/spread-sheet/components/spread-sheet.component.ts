import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class SpreadSheetComponent implements OnInit {

  sheetOrder: string[];

  constructor(
    private spreadSheetStoreService: SpreadSheetStoreService
  ) { }

  ngOnInit() {
    this.sheetOrder = this.spreadSheetStoreService.sheetOrder;
  }

}
