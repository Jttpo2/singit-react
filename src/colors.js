import Color from 'color';
// #f2f2f2'

const base = {
  buttonLabel: 'white'
}



const Colors = {
  background: 'black',
  // background: 'white',
  currentLine: 'yellow',
  prevLine: 'darkgrey',
  upcomingLine: 'lightgrey',
  ctrlButtonBackground: 'none',
  // ctrlButttonLabel: 'white',
  prevButtonLabel: Color(base.buttonLabel).lighten(0.1).string(),
  nextButtonLabel: base.buttonLabel,
  menuBackground: '#373a47',
  hamburgerButtonLines: 'white'
}

if (Object.freeze) Object.freeze(Colors);

export default Colors;
