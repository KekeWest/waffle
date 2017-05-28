
import { Sheet } from "app/spread-sheet";

export class SpreadSheet {

  constructor(
    public name: string,
    public sheets: { [sheetName: string]: Sheet },
    public sheetOrder: string[],
    public selectedSheetName: string
  ) { }

}
