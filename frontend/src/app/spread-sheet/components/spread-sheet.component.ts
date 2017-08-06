import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SpreadSheetDispatcherService, SpreadSheetActionService, SpreadSheetStoreService, CommandStoreService, SheetViewDispatcherService, SheetViewActionService, SheetViewStoreService } from "app/spread-sheet/services";
import { Sheet } from "app/spread-sheet";
import { Payload } from "app/common/base";
import { SharedEditApiService } from "app/spread-sheet/services/shared-edit-api.service";

@Component({
  selector: 'wf-spread-sheet',
  templateUrl: './spread-sheet.component.html',
  styleUrls: ['./spread-sheet.component.scss'],
  providers: [
    SharedEditApiService,
    SpreadSheetDispatcherService,
    SpreadSheetActionService,
    SpreadSheetStoreService,
    SheetViewDispatcherService,
    SheetViewActionService,
    SheetViewStoreService,
    CommandStoreService
  ]
})
export class SpreadSheetComponent implements OnInit, OnDestroy {

  constructor(
    private sharedEditApiService: SharedEditApiService,
    private spreadSheetActionService: SpreadSheetActionService,
    private spreadSheetDispatcherService: SpreadSheetDispatcherService,
    private spreadSheetStoreService: SpreadSheetStoreService,
    private sheetViewActionService: SheetViewActionService,
    private sheetViewDispatcherService: SheetViewDispatcherService,
    private sheetViewStoreService: SheetViewStoreService,
    private commandStoreService: CommandStoreService
  ) { }

  ngOnInit() {
    this.sharedEditApiService.start();
  }

  ngOnDestroy() {
    this.sharedEditApiService.close();
  }

}
