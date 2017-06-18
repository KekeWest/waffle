import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SpreadSheetComponent } from './spread-sheet/components/spread-sheet.component';
import { SheetTabComponent } from './spread-sheet/components/sheet-tab/sheet-tab.component';
import { SheetEditComponent } from './spread-sheet/components/sheet-edit/sheet-edit.component';
import { ColumnGridComponent } from './spread-sheet/components/sheet/column-grid/column-grid.component';
import { RowGridComponent } from './spread-sheet/components/sheet/row-grid/row-grid.component';
import { WorkSheetComponent } from './spread-sheet/components/sheet/work-sheet/work-sheet.component';
import { AllCellComponent } from './spread-sheet/components/sheet/all-cell/all-cell.component';
import { SheetViewCanvasComponent } from './spread-sheet/components/sheet/work-sheet/sheet-view-canvas/sheet-view-canvas.component';
import { MouseEventBoardComponent } from './spread-sheet/components/sheet/work-sheet/mouse-event-board/mouse-event-board.component';
import { SelectedCellAreaComponent } from './spread-sheet/components/sheet/work-sheet/mouse-event-board/selected-cell-area/selected-cell-area.component';
import { ValuesViewComponent } from './spread-sheet/components/sheet/work-sheet/values-view/values-view.component';
import { RedoUndoComponent } from './spread-sheet/components/sheet-edit/sheet-edit-home/redo-undo/redo-undo.component';
import { SheetEditHomeComponent } from './spread-sheet/components/sheet-edit/sheet-edit-home/sheet-edit-home.component';
import { FontStyleComponent } from './spread-sheet/components/sheet-edit/sheet-edit-home/font-style/font-style.component';
import { LoginComponent } from './login/components/login/login.component';
import { RootComponent } from './root/components/root/root.component';
import { HomeComponent } from './home/components/home/home.component';

@NgModule({
  declarations: [
    RootComponent,
    SpreadSheetComponent,
    SheetTabComponent,
    SheetEditComponent,
    ColumnGridComponent,
    RowGridComponent,
    WorkSheetComponent,
    AllCellComponent,
    SheetViewCanvasComponent,
    MouseEventBoardComponent,
    SelectedCellAreaComponent,
    ValuesViewComponent,
    RedoUndoComponent,
    SheetEditHomeComponent,
    FontStyleComponent,
    LoginComponent,
    RootComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
