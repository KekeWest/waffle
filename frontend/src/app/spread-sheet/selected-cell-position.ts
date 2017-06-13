export class SelectedCellPosition {

  constructor(
    public startColNum: number,
    public startRowNum: number,
    public endColNum: number,
    public endRowNum: number,
    public clickColNum: number,
    public clickRowNum: number
  ) { }

  contains(colNum: number, rowNum: number): boolean {
    if (colNum < this.startColNum || this.endColNum < colNum) {
      return false;
    }
    if (rowNum < this.startRowNum || this.endRowNum < rowNum) {
      return false;
    }
    return true;
  }

  isClickCell(colNum: number, rowNum: number): boolean {
    if (this.clickColNum === colNum && this.clickRowNum === rowNum) {
      return true;
    }
    return false;
  }

}