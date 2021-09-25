import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    if (showComments) {
      const res = await fetch(`/api/comments/${eventId}`);

      if (res.status === 200) {
        const { data } = await res.json();
        setComments(data);
      }
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  async function addCommentHandler({ email, name, text }) {
    const reqBody = JSON.stringify({
      eventId,
      email,
      name,
      text,
    });

    const res = await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: reqBody,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      const { data } = await res.json();
      setComments(prevComments => [data, ...prevComments]);
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
