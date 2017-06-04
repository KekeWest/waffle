import { Component, OnInit } from '@angular/core';
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
export class SheetTabComponent implements OnInit {

  private _sheetOrder: string[];

  constructor(
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private createNewSheetActionService: CreateNewSheetActionService
  ) { }

  ngOnInit() {
    this._sheetOrder = this.spreadSheetStoreService.sheetOrder;
  }

  private createNewSheet() {
    this.createNewSheetActionService.createNewSheet();
  }

  private selectSheet(sheetName: string) {
    this.spreadSheetActionService.selectSheet(sheetName);
  }

}
