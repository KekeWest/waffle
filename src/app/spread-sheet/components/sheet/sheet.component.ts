import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SpreadSheetStoreService, SheetViewDispatcherService, SheetViewActionService, SheetViewStoreService } from '../../services/index';

@Component({
  selector: 'wf-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  providers: [
    SheetViewDispatcherService,
    SheetViewActionService,
    SheetViewStoreService
  ]
})
export class SheetComponent implements OnInit, OnDestroy {

  @Input()
  private sheetName: string;

  constructor(
    private spreadSheetStoreService: SpreadSheetStoreService,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.sheetViewStoreService.sheetName = this.sheetName;
    this.sheetViewStoreService.sheet = this.spreadSheetStoreService.getSheet(this.sheetName);
  }

  ngOnDestroy() {
    this.sheetViewStoreService.onDestroy();
  }

}
