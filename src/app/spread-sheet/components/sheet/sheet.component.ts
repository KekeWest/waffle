import { Component, OnInit, Input } from '@angular/core';
import { SheetViewDispatcherService, SheetViewActionService, SheetViewStoreService, SpreadSheetStoreService } from "app/spread-sheet/services";
import { SelectedCellPosition } from "app/spread-sheet";

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
export class SheetComponent implements OnInit {

  @Input()
  private sheetName: string;

  constructor(
    private spreadSheetStoreService: SpreadSheetStoreService,
    private sheetViewActionService: SheetViewActionService,
    private sheetViewDispatcherService: SheetViewDispatcherService,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.sheetViewStoreService.sheetName = this.sheetName;
    this.sheetViewStoreService.sheet = this.spreadSheetStoreService.getSheet(this.sheetName);
    var selectedCellPos: SelectedCellPosition = this.spreadSheetStoreService.getSelectedCellPosition(this.sheetName);
    if (selectedCellPos) {
      this.sheetViewStoreService.selectedCellPos = selectedCellPos;
    }
  }

}
