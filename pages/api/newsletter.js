import { sanitize } from 'sanitizer';
import { MongoClient } from 'mongodb';

import { validateEmail, NEWSLETTER_URL } from '../../helpers/util';

const client = new MongoClient(NEWSLETTER_URL);

export default async (req, res) => {
  const { method, body } = req;
  const email = sanitize(body.email);
  let newEmail;

  if (method === 'POST') {
    if (validateEmail(email)) {
      try {
        await client.connect();
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Connecting to the Database failed!' });
      }

      try {
        newEmail = { email, date: Date.now() };

        await client.db().collection('emails').insertOne(newEmail);
      } catch (error) {
        return res.status(500).json({ message: 'Inserting data failed!' });
      }

      return res.status(201).json({ message: 'success', data: newEmail });
    }

    res.status(400).json({ message: 'Invalid email address' });
  }
};
