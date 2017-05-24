import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SpreadSheetComponent } from './spread-sheet/components/spread-sheet.component';
import { SheetComponent } from './spread-sheet/components/sheet/sheet.component';
import { SheetTabComponent } from './spread-sheet/components/sheet-tab/sheet-tab.component';
import { SheetEditComponent } from './spread-sheet/components/sheet-edit/sheet-edit.component';
import { ColumnGridComponent } from './spread-sheet/components/sheet/column-grid/column-grid.component';
import { RowGridComponent } from './spread-sheet/components/sheet/row-grid/row-grid.component';
import { WorkSheetComponent } from './spread-sheet/components/sheet/work-sheet/work-sheet.component';
import { AllCellComponent } from './spread-sheet/components/sheet/all-cell/all-cell.component';
import { SheetViewCanvasComponent } from './spread-sheet/components/sheet/work-sheet/sheet-view-canvas/sheet-view-canvas.component';
import { MouseEventBoardComponent } from './spread-sheet/components/sheet/work-sheet/mouse-event-board/mouse-event-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SpreadSheetComponent,
    SheetComponent,
    SheetTabComponent,
    SheetEditComponent,
    ColumnGridComponent,
    RowGridComponent,
    WorkSheetComponent,
    AllCellComponent,
    SheetViewCanvasComponent,
    MouseEventBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
