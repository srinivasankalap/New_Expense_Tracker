import { Link } from 'react-router-dom';
import classes from './StartingPageContent.module.css';
import { useEffect, useState } from 'react';

const StartingPageContent = () => {
  const [show, setShow]=useState(true);

  useEffect(() => {
    const id = localStorage.getItem('token');
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBs6tNL-lygc73SI0m7rbUpcSBMWLNlaao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data from the server.');
        }
      })
      .then((data) => {
        if (data.users[0].displayName && data.users[0].photoUrl){
          setShow(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <section className={classes.starting}>
      <h1>Welcome to Expense Tracker..</h1>
    {show && <p>Your profile is incomplete <Link to='/profile'>Click Here</Link> to complete..</p>}
    </section>
  );
};

export default StartingPageContent;
