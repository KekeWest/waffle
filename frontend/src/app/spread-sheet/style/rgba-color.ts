export class RGBAColor {

  constructor(
    public colorR: number = 255,
    public colorG: number = 255,
    public colorB: number = 255,
    public alpha: number = 0
  ) { }

  toString() {
    return "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.alpha + ")";
  }
}
