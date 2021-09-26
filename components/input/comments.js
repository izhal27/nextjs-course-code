import { useState, useEffect, useContext, useRef } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import NotificationContext from '../../store/notification-context';

import classes from './comments.module.css';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const commentsStartSectionRef = useRef(null);
  const { showNotification } = useContext(NotificationContext);

  useEffect(async () => {
    if (showComments) {
      setIsFetchingComments(true);
      const res = await fetch(`/api/comments/${eventId}`);

      if (res.status === 200) {
        const { data } = await res.json();
        setComments(data);
        setIsFetchingComments(false);
        scrollToTopOfComment();
      }
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  const scrollToTopOfComment = () => {
    commentsStartSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  async function addCommentHandler({ email, name, text }) {
    const reqBody = JSON.stringify({
      eventId,
      email,
      name,
      text,
    });

    try {
      showNotification({
        title: 'Sending Comment..',
        message: 'Adding comment into database.',
        status: 'pending',
      });

      const res = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: reqBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const { data } = await res.json();
        setComments(prevComments => [data, ...prevComments]);

        showNotification({
          title: 'Success',
          message: 'Successfully Addedd comment.',
          status: 'success',
        });
        scrollToTopOfComment();
      } else {
        const { message } = await res.json();

        showNotification({
          title: 'Error',
          message: message || 'Somenthing went wrong.',
          status: 'error',
        });
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Somenthing went wrong.',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      <div ref={commentsStartSectionRef}></div>
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
