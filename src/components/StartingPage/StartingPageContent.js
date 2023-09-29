import { Link } from 'react-router-dom';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome to Expense Tracker..</h1>
      <p>Your profile is incomplete <Link to='/profile'>Click Here</Link> to complete..</p>
    </section>
  );
};

export default StartingPageContent;
