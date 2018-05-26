import Color from 'color';

export default class Helper {
  static darkenByOffset = (color, offset) => {
    const darkeningStep = 1;
    // More darkening inititially, less the further from zero offset we get
    return Color(color).darken(Math.abs(offset - 1) * darkeningStep * 1/offset).string();
  }
}
