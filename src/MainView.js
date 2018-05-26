import React from 'react';
import styled from 'styled-components';

import Colors from './colors.js';
import LyricPrompter from './LyricPrompter.js';

export default class Mainview extends React.Component {
  render() {
    return (
      <Container>
        <LyricPrompter
          lyric={this.props.lyric}
          currentLyricIndex={this.props.currentLyricIndex}
          noOfPrevLines={this.props.noOfPrevLines}
          noOfUpcomingLines={this.props.noOfUpcomingLines}>
        </LyricPrompter>
        <ControlButtonContainer>
          <PrevButton
            onClick={() => this.props.handlePrev()}
            key='prevButton'>
            Previous line
          </PrevButton>
          <NextButton
            onClick={() => this.props.handleNext()}
            key='nextButton'>
            Next line
          </NextButton>
        </ControlButtonContainer>
      </Container>
    );
  }
}

const Container = styled.div`
height: 100%;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
`;

const ControlButtonContainer = styled.div`
position: absolute;
width: 100%;
height: 35%;
bottom: 0;
z-index: 1;

display: flex;
flex-flow: column;
`;

const ControlButton = styled.button`
background: ${Colors.ctrlButtonBackground};
${'' /* color: ${Colors.ctrlButttonLabel}; */}
border: none;

:focus {
  outline: none
}

display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
`;

const PrevButton = ControlButton.extend`
flex: 0.3;
${'' /* background: green; */}
font-size: calc(8px + 1vh);
color: ${Colors.prevButtonLabel};

justify-content: flex-end;
padding-bottom: 16px;
`;

const NextButton = ControlButton.extend`
flex: 0.7;
${'' /* background: blue; */}
font-size: calc(18px + 1vh);
font-weight: bold;
color: ${Colors.nextButtonLabel}
`;
