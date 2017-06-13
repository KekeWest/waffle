import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetActionService, SpreadSheetStoreService, CommandStoreService, SheetViewDispatcherService, SheetViewActionService, SheetViewStoreService } from "app/spread-sheet/services";
import { Sheet } from "app/spread-sheet";
import { Payload } from "app/base";

@Component({
  selector: 'wf-spread-sheet',
  templateUrl: './spread-sheet.component.html',
  styleUrls: ['./spread-sheet.component.scss'],
  providers: [
    SpreadSheetDispatcherService,
    SpreadSheetActionService,
    SpreadSheetStoreService,
    SheetViewDispatcherService,
    SheetViewActionService,
    SheetViewStoreService,
    CommandStoreService
  ]
})
export class SpreadSheetComponent implements OnInit {

  constructor(
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private sheetViewActionService: SheetViewActionService,
    private sheetViewDispatcherService: SheetViewDispatcherService,
    private sheetViewStoreService: SheetViewStoreService,
    private commandStoreService: CommandStoreService
  ) { }

  ngOnInit() {
  }

}
