import { RGBAColor } from './rgba-color';

export class Border {

  public static MAX_BORDER_WIDRH = 3;

  borderBottom: boolean = false;
  borderBottomColor: RGBAColor;
  borderBottomStyle: string;
  borderBottomWidth: number;

  borderRight: boolean = false;
  borderRightColor: RGBAColor;
  borderRightStyle: string;
  borderRightWidth: number;

}
