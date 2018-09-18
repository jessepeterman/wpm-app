import React, { Component } from 'react';
import './App.css';
import { callbackify } from 'util';

// Create a WPM app
// create a timer that goes from 60 seconds to 0 and stops
// create a 3 2 1 countdown before starting timer
// create a block of text that stores words
// create reading display that will show 10 ( or so) words at a time
// When user presses button (or right arrow) log the number of words just read
// sum Tally the words read when the timer finishes
// if time is set to something other than 60 seconds, divide the number of words by whatever to get WPM rate.
//

const PAPText = `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters. “My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?” Mr. Bennet replied that he had not. “But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.” Mr. Bennet made no answer. “Do you not want to know who has taken it?” cried his wife impatiently. “_You_ want to tell me, and I have no objection to hearing it.” This was invitation enough. “Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week.” “What is his name?” “Bingley.” “Is he married or single?” “Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!” “How so? How can it affect them? "My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You
must know that I am thinking of his marrying one of them."

"Is that his design in settling here?"

"Design! Nonsense, how can you talk so! But it is very likely that he
_may_ fall in love with one of them, and therefore you must visit him as
soon as he comes."

"I see no occasion for that. You and the girls may go, or you may send
them by themselves, which perhaps will be still better, for as you are
as handsome as any of them, Mr. Bingley may like you the best of the
party."

"My dear, you flatter me. I certainly _have_ had my share of beauty, but
I do not pretend to be anything extraordinary now. When a woman has five
grown-up daughters, she ought to give over thinking of her own beauty."

"In such cases, a woman has not often much beauty to think of."

"But, my dear, you must indeed go and see Mr. Bingley when he comes into
the neighbourhood."

"It is more than I engage for, I assure you."

"But consider your daughters. Only think what an establishment it would
be for one of them. Sir William and Lady Lucas are determined to
go, merely on that account, for in general, you know, they visit no
newcomers. Indeed you must go, for it will be impossible for _us_ to
visit him if you do not."

"You are over-scrupulous, surely. I dare say Mr. Bingley will be very
glad to see you; and I will send a few lines by you to assure him of my
hearty consent to his marrying whichever he chooses of the girls; though
I must throw in a good word for my little Lizzy."

"I desire you will do no such thing. Lizzy is not a bit better than the
others; and I am sure she is not half so handsome as Jane, nor half so
good-humoured as Lydia. But you are always giving _her_ the preference."

"They have none of them much to recommend them," replied he; "they are
all silly and ignorant like other girls; but Lizzy has something more of
quickness than her sisters."

"Mr. Bennet, how _can_ you abuse your own children in such a way? You
take delight in vexing me. You have no compassion for my poor nerves."

"You mistake me, my dear. I have a high respect for your nerves. They
are my old friends. I have heard you mention them with consideration
these last twenty years at least."

"Ah, you do not know what I suffer."

"But I hope you will get over it, and live to see many young men of four
thousand a year come into the neighbourhood."
`;

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

const PrintResults = props => {
  return (
    props.isFinished && (
      <h2>You read {props.numOfWords * 4} words per minute.</h2>
    )
  );
};

class WpmApp extends React.Component {
  state = {
    text: '',
    textCounter: 0,
    countdown: 14,
    isRunning: false,
    isFinished: false
  };

  next = () => {
    if (!this.state.isRunning && !this.state.isFinished) {
      this.startTimer();

      this.setState({
        isRunning: true
      });
    } else if (!this.state.isFinished) {
      let i = this.state.textCounter;
      let end = this.state.textCounter + 10;
      let nextText = '';
      for (; i < end; i++) {
        nextText += PAPText.split(' ')[i] + ' ';
        this.setState({
          text: nextText,
          textCounter: this.state.textCounter + 10
        });
      }
    } else if (this.state.isFinished) {
      setTimeout(() => {
        this.setState({
          text: '',
          textCounter: 0,
          countdown: 14,
          isRunning: false,
          isFinished: false
        });
      }, 3000);
    }
  };

  startTimer = () => {
    let timer = setInterval(() => {
      this.setState(prevstate => {
        return { countdown: prevstate.countdown - 1 };
      });
      if (this.state.countdown === 0) {
        // alert(`You read ${this.state.textCounter * 4} words per minute!`);
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

  printResults = () => {
    alert(`you read ${this.state.textCounter - 10} words`);
  };

  render() {
    console.log(this.state);
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

          {/* <TestComponent /> */}
        </div>
      </div>
    );
  }
}

// class TestComponent extends React.Component {
//   state = {
//     timer: 5
//   };

//   handleClick = () => {
//     // let timer = this.state.timer;
//     // timer--;
//     this.setState(prevstate => {
//       return { timer: prevstate.timer - 1 };
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h1>Test timer: {this.state.timer}</h1>
//         <button onClick={this.handleClick}>Click</button>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<WpmApp />, document.querySelector("#app"));

export default WpmApp;
