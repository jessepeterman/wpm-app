import React, { Component } from 'react';
import './App.css';
import fictionText from './PAPText';
import { religiousText } from './PAPText';
import { poetryText } from './PAPText';

const TextDisplay = ({ text }) => {
  return <p id="text">{text || 'Prepare to read the text here'}</p>;
};

const Timer = props => {
  return (
    <h3 id="timer">
      00:
      {props.count < 10 ? '0' + props.count : props.count}
    </h3>
  );
};

const TextSelector = props => {
  const selectTextType = e => {
    props.setTextType(e.target.value);
  };
  return (
    <select onChange={selectTextType}>
      <option>Select Genre</option>
      <option>Fiction</option>
      <option>Religious</option>
      <option>Poetry</option>
    </select>
  );
};

const defaultSettings = {
  text: '',
  textCounter: 0,
  countdown: 59,
  isRunning: false,
  isFinished: false,
  textType: 'Fiction',
  fullText: fictionText
};

class WpmApp extends React.Component {
  state = defaultSettings;

  next = () => {
    if (!this.state.isRunning && !this.state.isFinished) {
      this.startTimer();
      this.getNextText();
      this.setState({
        isRunning: true
      });
    } else if (!this.state.isFinished) {
      this.getNextText();
    } else if (this.state.isFinished) {
      this.resetAppState();
    }
  };

  startTimer = () => {
    let timer = setInterval(() => {
      this.setState(prevstate => {
        return { countdown: prevstate.countdown - 1 };
      });
      if (this.state.countdown === 0) {
        this.setState(prevstate => {
          return {
            isRunning: !prevstate.isRunning,
            text: `You read ${this.state.textCounter * 4} words per minute!`
          };
        });
        clearInterval(timer);
        this.setState({
          isFinished: !this.state.isFinished
        });
      }
    }, 1000);
  };

  getNextText = () => {
    let i = this.state.textCounter;
    let end = this.state.textCounter + 10;
    let nextText = '';
    let text = '';

    if (i + 10 < this.state.fullText.replace(/\s+/g, ' ').split(' ').length) {
      for (; i < end; i++) {
        nextText +=
          this.state.fullText.replace(/\s+/g, ' ').split(' ')[i] + ' ';
        this.setState({
          text: nextText,
          textCounter: this.state.textCounter + 10
        });
      }
    }
  };

  resetAppState = () => {
    this.setState({
      text: this.state.text + ' Resetting...'
    });

    setTimeout(() => {
      this.setState(defaultSettings);
    }, 3000);
  };

  setTextType = textType => {
    this.setState({
      textType
    });
    switch (textType) {
      case 'Fiction':
        this.setState({ fullText: fictionText });
        console.log(this.state.textType);
        break;
      case 'Religious':
        this.setState({ fullText: religiousText });
        break;
      case 'Poetry':
        this.setState({ fullText: poetryText });
        break;
      default:
        this.setState({ fullText: fictionText });
    }
  };

  printResults = () => {
    alert(`you read ${this.state.textCounter - 10} words`);
  };

  render() {
    console.log(this.state.textCounter);
    return (
      <div>
        <div className="container">
          <h1 id="title">ReactWPM</h1>
          <Timer count={this.state.countdown} />
          <TextDisplay text={this.state.text} />
          <div id="button" disabled={this.state.isFinished} onClick={this.next}>
            {this.state.isRunning && !this.state.isFinished
              ? 'Next'
              : this.state.isFinished
                ? 'Reset'
                : 'Start'}
          </div>
          <TextSelector setTextType={this.setTextType} />
        </div>
      </div>
    );
  }
}

export default WpmApp;
