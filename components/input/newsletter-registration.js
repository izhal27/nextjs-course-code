import { useContext, useRef, useState } from 'react';
import NotificationContext from '../../store/notification-context';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const inputEmailRef = useRef();
  const { showNotification, hideNotification } =
    useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    showNotification({
      title: 'Signing Up',
      message: 'Registering for Newsletter',
      status: 'pending',
    });

    const email = inputEmailRef.current.value;
    const reqBody = JSON.stringify({ email });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: reqBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        showNotification({
          title: 'Success',
          message: 'Successfully registered for Newsletter',
          status: 'success',
        });
        inputEmailRef.current.value = '';
      } else {
        const { message } = await res.json();

        showNotification({
          title: 'Error',
          message: message || 'Somenthing went wrong',
          status: 'error',
        });
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Somenthing went wrong',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <fieldset disabled={isLoading} style={{ border: 0 }}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              required
              ref={inputEmailRef}
            />
            <button>Register</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
