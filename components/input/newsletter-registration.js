import { useRef, useState } from 'react';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const inputEmailRef = useRef();

  async function registrationHandler(event) {
    setIsLoading(true);
    event.preventDefault();

    const email = inputEmailRef.current.value;
    const reqBody = JSON.stringify({ email });

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      body: reqBody,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      inputEmailRef.current.value = '';
    }

    setIsLoading(false);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            required
            ref={inputEmailRef}
            disabled={isLoading}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
