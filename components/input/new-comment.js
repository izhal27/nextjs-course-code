import { useRef, useState } from 'react';
import classes from './new-comment.module.css';

function NewComment(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  async function sendCommentHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setIsInvalid(false);

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true);
      setIsLoading(false);
      return;
    }

    await props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    emailInputRef.current.value = '';
    nameInputRef.current.value = '';
    commentInputRef.current.value = '';
    setIsLoading(false);
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <fieldset disabled={isLoading} style={{ border: 0 }}>
        <div className={classes.row}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="comment">Your comment</label>
          <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
        </div>
        {isInvalid && <p>Please enter a valid email address and comment!</p>}
        <button>Submit</button>
      </fieldset>
    </form>
  );
}

export default NewComment;
