import { Component, OnInit, Input } from '@angular/core';
import { SheetViewActionService, SheetViewStoreService } from '../../../services/index';

@Component({
  selector: 'wf-row-grid',
  templateUrl: './row-grid.component.html',
  styleUrls: ['./row-grid.component.scss']
})
export class RowGridComponent implements OnInit {

  private _sheetViewRowList: number[];

  private _rowViewTop: number;

  constructor(
    private sheetViewActionService: SheetViewActionService,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (changeType: string, data: any) => {
        switch(changeType) {
          case "init-sheet-view":
            this.updateRowView();
            break;
          case "update-sheet-view":
            this.updateRowView();
            break;
        }
      }
    );
  }

  private updateRowView() {
    if (!this._sheetViewRowList) {
      this._sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    }
    this._rowViewTop = (this.sheetViewStoreService.viewScrollTop - this.sheetViewStoreService.sheetViewTop) * -1;
  }

}
