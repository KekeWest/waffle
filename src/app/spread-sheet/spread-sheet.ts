import { Sheet } from './sheet';

export class SpreadSheet {

  constructor(
    public name: string,
    public sheets: { [sheetName: string]: Sheet },
    public sheetOrder: string[]
  ) { }

}
