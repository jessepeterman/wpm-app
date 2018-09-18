import React, { Component } from "react";
import "./App.css";

// Create a WPM app
// create a timer that goes from 60 seconds to 0 and stops
// create a 3 2 1 countdown before starting timer
// create a block of text that stores words
// create reading display that will show 10 ( or so) words at a time
// When user presses button (or right arrow) log the number of words just read
// sum Tally the words read when the timer finishes
// if time is set to something other than 60 seconds, divide the number of words by whatever to get WPM rate.
//

const PAPText = `PRIDE AND PREJUDICE By Jane Austen Chapter 1 It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters. “My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?” Mr. Bennet replied that he had not. “But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.” Mr. Bennet made no answer. “Do you not want to know who has taken it?” cried his wife impatiently. “_You_ want to tell me, and I have no objection to hearing it.” This was invitation enough. “Why, my dear, you must know, Mrs. Long says that Netherfield is taken
by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week.” “What is his name?” “Bingley.” “Is he married or single?” “Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!” “How so? How can it affect them?`;

const TextDisplay = props => {
  let display = props.text || "Prepare to read the text in this area";

  const next10 = () => {
    props.next();
  };

  return (
    <div>
      <p id="text">{display}</p>
      <button id="button" onClick={next10}>
        Next
      </button>
    </div>
  );
};

const Timer = props => {
  return <h3 id="timer">{props.count}</h3>;
};

const PrintResults = props => {
  const printResults = () => {
    props.printResults();
  };
  return (
    <div>
      <button onClick={printResults}>Print Results</button>
      <h2>
        You read {props.numOfWords > 0 ? props.numOfWords : 0} words in 1
        minute.
      </h2>
    </div>
  );
};

class WpmApp extends React.Component {
  state = {
    text: "",
    textCounter: 0,
    countdown: 3,
    isRunning: false,
    isFinished: false
  };

  next = () => {
    if (!this.state.isRunning) {
      this.startTimer();
      this.setState({
        isRunning: true
      });
    } else {
      let i = this.state.textCounter;
      let end = this.state.textCounter + 10;
      let nextText = "";
      for (; i < end; i++) {
        nextText += PAPText.split(" ")[i] + " ";
        this.setState({
          text: nextText,
          textCounter: this.state.textCounter + 10
        });
      }
    }
  };

  startTimer = () => {
    let timer = setInterval(() => {
      this.setState(prevstate => {
        countdown: prevstate.countdown--;
      });
      if (this.state.countdown === 0) {
        alert("finished");
        this.setState(prevstate => {
          isRunning: !prevstate.isRunning;
        });
        clearInterval(timer);
      }
    }, 1000);
  };

  printResults = () => {
    alert(`you read ${this.state.textCounter - 10} words`);
  };

  render() {
    return (
      <div className="container">
        <Timer count={this.state.countdown} />
        <TextDisplay next={this.next} text={this.state.text} />
        <PrintResults
          printResults={this.printResults}
          numOfWords={this.state.textCounter - 10}
        />
      </div>
    );
  }
}

// ReactDOM.render(<WpmApp />, document.querySelector("#app"));

export default WpmApp;
