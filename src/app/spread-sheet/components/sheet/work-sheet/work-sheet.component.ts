import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Sheet, Column, Row, Cell, Border, RGBAColor } from '../../../../spread-sheet/index';
import { SheetViewActionService, SheetViewStoreService } from '../../../services/index';

@Component({
  selector: 'wf-work-sheet',
  templateUrl: './work-sheet.component.html',
  styleUrls: ['./work-sheet.component.scss'],
})
export class WorkSheetComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild("workSheetView")
  private _workSheetViewRef: ElementRef;

  @ViewChild("sheetViewCanvas")
  private _sheetViewCanvasRef: ElementRef;

  private _sheetViewStage: createjs.Stage;

  private _areaWidth: number;

  private _areaHeight: number;

  private _sheetViewWidthAttr: number;

  private _sheetViewHeightAttr: number;

  private _sheetViewWidthStyle: number;

  private _sheetViewHeightStyle: number;

  private _sheetViewColumnList: number[];

  private _sheetViewRowList: number[];

  private _sheetViewTop: number;

  private _sheetViewLeft: number;

  private _defaultBorder: Border;

  constructor(
    private elementRef: ElementRef,
    private sheetViewActionService: SheetViewActionService,
    private sheetViewStoreService: SheetViewStoreService
  ) { }

  ngOnInit() {
    this._defaultBorder = new Border();
    this._defaultBorder.borderBottom = true;
    this._defaultBorder.borderBottomColor = new RGBAColor(233, 233, 233, 1);
    this._defaultBorder.borderBottomStyle = "solid";
    this._defaultBorder.borderBottomWidth = 1;
    this._defaultBorder.borderRight = true;
    this._defaultBorder.borderRightColor = new RGBAColor(233, 233, 233, 1);
    this._defaultBorder.borderRightStyle = "solid";
    this._defaultBorder.borderRightWidth = 1;

    this.sheetViewStoreService.register(
      (changeType: string, data: any) => {
        switch (changeType) {
          case "init-sheet-view":
            this.updateSheetView();
            break;
          case "update-sheet-view":
            this.updateSheetView();
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.sheetViewActionService.initSheet(
      this._workSheetViewRef.nativeElement
    );
  }

  ngAfterViewChecked() {
    if (!this._sheetViewStage) {
      this._sheetViewStage = new createjs.Stage(this._sheetViewCanvasRef.nativeElement);
      if (window.devicePixelRatio) {
        this._sheetViewStage.scaleX = this._sheetViewStage.scaleY = window.devicePixelRatio;
      }
    }
    this.drawSheetView();
  }

  private updateSheetView() {
    if (!this._sheetViewColumnList || !this._sheetViewRowList) {
      this._sheetViewColumnList = this.sheetViewStoreService.sheetViewColumnList;
      this._sheetViewRowList = this.sheetViewStoreService.sheetViewRowList;
    }

    if (this.sheetViewStoreService.areaWidth < this.sheetViewStoreService.viewScrollLeft + this.sheetViewStoreService.viewWidth) {
      this._areaWidth = this.sheetViewStoreService.viewScrollLeft + this.sheetViewStoreService.viewWidth * 2;
    } else {
      this._areaWidth = this.sheetViewStoreService.areaWidth + this.sheetViewStoreService.viewWidth;
    }
    if (this.sheetViewStoreService.areaHeight < this.sheetViewStoreService.viewScrollTop + this.sheetViewStoreService.viewHeight) {
      this._areaHeight = this.sheetViewStoreService.viewScrollTop + this.sheetViewStoreService.viewHeight * 2;
    } else {
      this._areaHeight = this.sheetViewStoreService.areaHeight + this.sheetViewStoreService.viewHeight;
    }

    if (window.devicePixelRatio) {
      this._sheetViewWidthAttr = this.sheetViewStoreService.sheetViewWidth * window.devicePixelRatio;
      this._sheetViewHeightAttr = this.sheetViewStoreService.sheetViewHeight * window.devicePixelRatio;
    } else {
      this._sheetViewWidthAttr = this.sheetViewStoreService.sheetViewWidth;
      this._sheetViewHeightAttr = this.sheetViewStoreService.sheetViewHeight;
    }
    this._sheetViewWidthStyle = this.sheetViewStoreService.sheetViewWidth;
    this._sheetViewHeightStyle = this.sheetViewStoreService.sheetViewHeight;
    this._sheetViewTop = this.sheetViewStoreService.sheetViewTop;
    this._sheetViewLeft = this.sheetViewStoreService.sheetViewLeft;
  }

  private onScroll() {
    this.sheetViewActionService.scrollSheet();
  }

  private drawSheetView() {
    this._sheetViewStage.removeAllChildren();
    this.drawCellRect();
    this.drawCellBorder();
    this._sheetViewStage.update();
  }

  private drawCellRect() {
    var shape: createjs.Shape = new createjs.Shape();
    this._sheetViewStage.addChild(shape);

    var posY: number = 0;
    for (var rowNum of this.sheetViewStoreService.sheetViewRowList) {
      var height: number = this.sheetViewStoreService.getRow(rowNum).height;
      var posX: number = 0;
      for (var colNum of this.sheetViewStoreService.sheetViewColumnList) {
        var width: number = this.sheetViewStoreService.getColumn(colNum).width;
        this.setCellBackgroundColor(colNum, rowNum, shape.graphics);
        shape.graphics.drawRect(posX, posY, width, height);
        posX += width;
      }
      posY += height;
    }
  }

  private drawCellBorder() {
    var posX: number = 0;
    var posY: number = 0;
    var shape = new createjs.Shape();
    this._sheetViewStage.addChild(shape);

    for (var rowNum of this.sheetViewStoreService.sheetViewRowList) {
      var height: number = this.sheetViewStoreService.getRow(rowNum).height;
      posX = 0;
      for (var colNum of this.sheetViewStoreService.sheetViewColumnList) {
        var width: number = this.sheetViewStoreService.getColumn(colNum).width;
        this.drawCellBorderBottom(colNum, rowNum, posX, posX + width, posY + height, shape.graphics);
        this.drawCellBorderRight(colNum, rowNum, posY, posY + height, posX + width, shape.graphics);
        posX += width;
      }
      posY += height;
    }
  }

  private drawCellBorderBottom(colNum: number, rowNum: number, leftX: number, rightX: number, y: number, graphics: createjs.Graphics) {
    var border: Border = this.getCellBorderBottom(colNum, rowNum);
    if (!border.borderBottom) {
      return;
    }

    var shift: number = 0;
    if (border.borderBottomWidth % 2 == 1) {
      shift = 0.5;
    }

    graphics.beginStroke(border.borderBottomColor.toString());
    graphics.setStrokeStyle(border.borderBottomWidth);
    graphics.moveTo(leftX - this.getBorderBottomShiftLeft(colNum, rowNum, border.borderBottomWidth) + shift, y + shift);
    graphics.lineTo(rightX + this.getBorderBottomShiftRight(colNum, rowNum, border.borderBottomWidth) + shift, y + shift);
    graphics.endStroke();
  }

  private getBorderBottomShiftLeft(colNum: number, rowNum: number, borderBottomWidth: number): number {
    var otherBorder: Border;
    var leftEdgeMax: number = 0;
    var leftEdgeSecondMax: number = 0;
    var leftWidth: number = 0;

    otherBorder = this.getCellBorderBottom(colNum - 1, rowNum);
    leftWidth = otherBorder.borderBottomWidth;
    if (otherBorder.borderBottom && leftEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (leftEdgeMax < otherBorder.borderBottomWidth) {
        leftEdgeSecondMax = leftEdgeMax;
        leftEdgeMax = otherBorder.borderBottomWidth;
      } else {
        leftEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum - 1, rowNum);
    if (otherBorder.borderRight && leftEdgeSecondMax < otherBorder.borderRightWidth) {
      if (leftEdgeMax < otherBorder.borderRightWidth) {
        leftEdgeSecondMax = leftEdgeMax;
        leftEdgeMax = otherBorder.borderRightWidth;
      } else {
        leftEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum - 1, rowNum + 1);
    if (otherBorder.borderRight && leftEdgeSecondMax < otherBorder.borderRightWidth) {
      if (leftEdgeMax < otherBorder.borderRightWidth) {
        leftEdgeSecondMax = leftEdgeMax;
        leftEdgeMax = otherBorder.borderRightWidth;
      } else {
        leftEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }

    if (borderBottomWidth >= leftEdgeMax) {
      return leftEdgeMax / 2.0;
    } else if (leftWidth == leftEdgeMax) {
      return leftEdgeSecondMax / -2.0;
    } else {
      return leftEdgeMax / -2.0;
    }
  }

  private getBorderBottomShiftRight(colNum: number, rowNum: number, borderBottomWidth: number): number {
    var otherBorder: Border;
    var rightEdgeMax: number = 0;
    var rightEdgeSecondMax: number = 0;
    var rightWidth: number = 0;

    otherBorder = this.getCellBorderBottom(colNum + 1, rowNum);
    rightWidth = otherBorder.borderBottomWidth;
    if (otherBorder.borderBottom && rightEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (rightEdgeMax < otherBorder.borderBottomWidth) {
        rightEdgeSecondMax = rightEdgeMax;
        rightEdgeMax = otherBorder.borderBottomWidth;
      } else {
        rightEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum, rowNum + 1);
    if (otherBorder.borderRight && rightEdgeSecondMax < otherBorder.borderRightWidth) {
      if (rightEdgeMax < otherBorder.borderRightWidth) {
        rightEdgeSecondMax = rightEdgeMax;
        rightEdgeMax = otherBorder.borderRightWidth;
      } else {
        rightEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum, rowNum);
    if (otherBorder.borderRight && rightEdgeMax < otherBorder.borderRightWidth) {
      if (rightEdgeMax < otherBorder.borderRightWidth) {
        rightEdgeSecondMax = rightEdgeMax;
        rightEdgeMax = otherBorder.borderRightWidth;
      } else {
        rightEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }

    if (borderBottomWidth >= rightEdgeMax) {
      return rightEdgeMax / 2.0;
    } else if (rightWidth == rightEdgeMax) {
      return rightEdgeSecondMax / -2.0;
    } else {
      return rightEdgeMax / -2.0;
    }
  }

  private drawCellBorderRight(colNum: number, rowNum: number, topY: number, bottomY: number, x: number, graphics: createjs.Graphics) {
    var border: Border = this.getCellBorderRight(colNum, rowNum);
    if (!border.borderRight) {
      return;
    }

    var shift: number = 0;
    if (border.borderRightWidth % 2 == 1) {
      shift = 0.5;
    }

    graphics.beginStroke(border.borderRightColor.toString());
    graphics.setStrokeStyle(border.borderRightWidth);
    graphics.moveTo(x + shift, topY - this.getBorderRightShiftTop(colNum, rowNum, border.borderRightWidth) + shift);
    graphics.lineTo(x + shift, bottomY + this.getBorderRightShiftBottom(colNum, rowNum, border.borderRightWidth) + shift);
    graphics.endStroke();
  }

  private getBorderRightShiftTop(colNum: number, rowNum: number, borderRightWidth: number): number {
    var otherBorder: Border;
    var topEdgeMax: number = 0;
    var topEdgeSecondMax: number = 0;
    var topWidth: number = 0;

    otherBorder = this.getCellBorderRight(colNum, rowNum - 1);
    topWidth = otherBorder.borderRightWidth;
    if (otherBorder.borderRight && topEdgeSecondMax < otherBorder.borderRightWidth) {
      if (topEdgeMax < otherBorder.borderRightWidth) {
        topEdgeSecondMax = topEdgeMax;
        topEdgeMax = otherBorder.borderRightWidth;
      } else {
        topEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderBottom(colNum, rowNum - 1);
    if (otherBorder.borderBottom && topEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (topEdgeMax < otherBorder.borderBottomWidth) {
        topEdgeSecondMax = topEdgeMax;
        topEdgeMax = otherBorder.borderBottomWidth;
      } else {
        topEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderBottom(colNum + 1, rowNum - 1);
    if (otherBorder.borderBottom && topEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (topEdgeMax < otherBorder.borderBottomWidth) {
        topEdgeSecondMax = topEdgeMax;
        topEdgeMax = otherBorder.borderBottomWidth;
      } else {
        topEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }

    if (borderRightWidth >= topEdgeMax) {
      return topEdgeMax / 2.0;
    } else if (topWidth == topEdgeMax) {
      return topEdgeSecondMax / -2.0;
    } else {
      return topEdgeMax / -2.0;
    }
  }

  private getBorderRightShiftBottom(colNum: number, rowNum: number, borderRightWidth: number): number {
    var otherBorder: Border;
    var bottomEdgeMax: number = 0;
    var bottomEdgeSecondMax: number = 0;
    var bottomWidth: number = 0;

    otherBorder = this.getCellBorderBottom(colNum + 1, rowNum);
    if (otherBorder.borderBottom && bottomEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (bottomEdgeMax < otherBorder.borderBottomWidth) {
        bottomEdgeSecondMax = bottomEdgeMax;
        bottomEdgeMax = otherBorder.borderBottomWidth;
      } else {
        bottomEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }
    otherBorder = this.getCellBorderRight(colNum, rowNum + 1);
    bottomWidth = otherBorder.borderRightWidth;
    if (otherBorder.borderRight && bottomEdgeSecondMax < otherBorder.borderRightWidth) {
      if (bottomEdgeMax < otherBorder.borderRightWidth) {
        bottomEdgeSecondMax = bottomEdgeMax;
        bottomEdgeMax = otherBorder.borderRightWidth;
      } else {
        bottomEdgeSecondMax = otherBorder.borderRightWidth;
      }
    }
    otherBorder = this.getCellBorderBottom(colNum, rowNum);
    if (otherBorder.borderBottom && bottomEdgeSecondMax < otherBorder.borderBottomWidth) {
      if (bottomEdgeMax < otherBorder.borderBottomWidth) {
        bottomEdgeSecondMax = bottomEdgeMax;
        bottomEdgeMax = otherBorder.borderBottomWidth;
      } else {
        bottomEdgeSecondMax = otherBorder.borderBottomWidth;
      }
    }

    if (borderRightWidth >= bottomEdgeMax) {
      return bottomEdgeMax / 2.0;
    } else if (bottomWidth == bottomEdgeMax) {
      return bottomEdgeSecondMax / -2.0;
    } else {
      return bottomEdgeMax / -2.0;
    }
  }

  private getCellBorderBottom(colNum: number, rowNum: number): Border {
    var cell: Cell = this.sheetViewStoreService.getCell(colNum, rowNum);
    if (cell.border.borderBottom) {
      return cell.border;
    }

    var row: Row = this.sheetViewStoreService.getRow(rowNum);
    if (row.border.borderBottom) {
      return row.border;
    }

    return this._defaultBorder;
  }

  private getCellBorderRight(colNum: number, rowNum: number): Border {
    var cell: Cell = this.sheetViewStoreService.getCell(colNum, rowNum);
    if (cell.border.borderRight) {
      return cell.border;
    }

    var column: Column = this.sheetViewStoreService.getColumn(colNum);
    if (column.border.borderRight) {
      return column.border;
    }

    return this._defaultBorder;
  }

  private setCellBackgroundColor(colNum: number, rowNum: number, graphics: createjs.Graphics) {
    var cell: Cell = this.sheetViewStoreService.getCell(colNum, rowNum);
    if (cell.backgroundColor) {
      graphics.beginFill(cell.backgroundColor.toString());
      return;
    }

    var row: Row = this.sheetViewStoreService.getRow(rowNum);
    if (row.backgroundColor) {
      graphics.beginFill(row.backgroundColor.toString());
      return;
    }

    var column: Column = this.sheetViewStoreService.getColumn(colNum);
    if (column.backgroundColor) {
      graphics.beginFill(column.backgroundColor.toString());
      return;
    }

    graphics.beginFill(null);
  }

}
