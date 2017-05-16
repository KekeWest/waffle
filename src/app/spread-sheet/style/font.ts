import { RGBAColor } from './rgba-color';

export class Font {

  fontFamily: string = "sans-serif";

  fontSize: number = 9;

  fontColor: RGBAColor = new RGBAColor(0, 0, 0, 1);

  bold: boolean = false;

  toString(): string {
    return (this.bold ? "bold " : "") + this.fontSize + "pt " + this.fontFamily;
  }

}
