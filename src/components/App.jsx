import { Component } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  handleClick = ({ target }) => {
    const { feedback } = target.dataset;
    this.setState(prevState => ({ [feedback]: prevState[feedback] + 1 }));
  };

  totalClick = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  positiveFeedback = () => {
    const { good } = this.state;
    const total = this.totalClick();
    return total ? Math.round((good / total) * 100) : 0;
  };

  render() {
    const total = this.totalClick();
    const { good, neutral, bad } = this.state;
    const positivePersent = this.positiveFeedback();

    return (
      <div>
        <Section title="Please leave fedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleClick}
          />
        </Section>
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positiveFeedback={positivePersent}
            />
          </Section>
        )}
      </div>
    );
  }
}
