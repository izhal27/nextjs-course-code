import { sanitize, escape } from 'sanitizer';
import { MongoClient } from 'mongodb';

import { validateEmail, EVENTS_URL } from '../../../helper/util';

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  const eventId = sanitize(body.eventId);
  const email = sanitize(body.email);
  const name = sanitize(body.name);
  const text = escape(body.text);

  const client = new MongoClient(EVENTS_URL);

  await client.connect();

  const db = client.db();
  const collection = db.collection('comments');

  switch (method) {
    case 'POST':
      if (validateEmail(email) && name && text) {
        const newComment = {
          eventId,
          email,
          name,
          text,
          date: Date.now(),
        };

        const result = await collection.insertOne({ ...newComment });
        newComment.id = result.insertedId;
        delete newComment['_id'];

        return res.status(201).json({ message: 'success', data: newComment });
      }

      res.status(422).json({ message: 'Invalid input fields' });
      break;

    default:
      const comments = await collection
        .find({ eventId: id })
        .sort({ _id: -1 })
        .toArray();
      const convertedComments = [
        ...comments.map(comment => {
          const newComment = { ...comment, id: comment['_id'] };
          delete newComment['_id'];

          return newComment;
        }),
      ];

      res.status(200).json({ message: 'success', data: convertedComments });
  }
};
