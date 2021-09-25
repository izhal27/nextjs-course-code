import classes from './comment-list.module.css';

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {comments.map(({ id, email, name, text, date }) => (
        <li key={id}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>{' '}
            <span style={{ color: 'gray', fontSize: '.85em' }}>
              {new Date(date).toLocaleString('id-ID')}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
