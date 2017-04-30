import { Component, OnInit, Input } from '@angular/core';
import { SheetViewActionService, SheetViewStoreService } from '../../../services/index';

@Component({
  selector: 'wf-column-grid',
  templateUrl: './column-grid.component.html',
  styleUrls: ['./column-grid.component.scss']
})
export class ColumnGridComponent implements OnInit {

  private _sheetViewColumnList: number[];

  private _columnViewLeft: number;

  constructor(
    private sheetViewActionService: SheetViewActionService,
    private sheetViewStoreService: SheetViewStoreService
) { }

  ngOnInit() {
    this.sheetViewStoreService.register(
      (changeType: string, data: any) => {
        switch(changeType) {
          case "init-sheet-view":
            this.updateColumnView();
            break;
          case "update-sheet-view":
            this.updateColumnView();
            break;
        }
      }
    );
  }

  private updateColumnView() {
    if (!this._sheetViewColumnList) {
      this._sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
    }
    this._columnViewLeft = (this.sheetViewStoreService.viewScrollLeft - this.sheetViewStoreService.sheetViewLeft) * -1;
  }

}
