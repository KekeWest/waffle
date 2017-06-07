import { Component, OnInit } from '@angular/core';
import { SpreadSheetActionService } from "app/spread-sheet/services";

@Component({
  selector: 'wf-sheet-edit',
  templateUrl: './sheet-edit.component.html',
  styleUrls: ['./sheet-edit.component.scss']
})
export class SheetEditComponent implements OnInit {

  constructor(
    private spreadSheetActionService: SpreadSheetActionService
  ) { }

  ngOnInit() {
  }

  undo() {
    this.spreadSheetActionService.undo();
  }

  redo() {
    this.spreadSheetActionService.redo();
  }

}
