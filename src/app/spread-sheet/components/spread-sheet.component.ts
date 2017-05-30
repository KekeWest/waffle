import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetActionService, SpreadSheetStoreService, CommandStoreService } from "app/spread-sheet/services";

@Component({
  selector: 'wf-spread-sheet',
  templateUrl: './spread-sheet.component.html',
  styleUrls: ['./spread-sheet.component.scss'],
  providers: [
    SpreadSheetDispatcherService,
    SpreadSheetActionService,
    SpreadSheetStoreService,
    CommandStoreService
  ]
})
export class SpreadSheetComponent implements OnInit {

  private _sheetOrder: string[];
  private _selectedSheetName: string;

  constructor(
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private commandStoreService: CommandStoreService
  ) { }

  ngOnInit() {
    this._sheetOrder = this.spreadSheetStoreService.sheetOrder;
    this._selectedSheetName = this.spreadSheetStoreService.selectedSheetName;
  }

}
