import { Fragment } from 'react';

import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage({ events }) {
  return (
    <Fragment>
      <EventList items={events} />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  try {
    const events = await getFeaturedEvents();

    if (!events) {
      return { notFound: true };
    }

    return {
      props: {
        events,
      },
      revalidate: 1800,
    };
  } catch (error) {
    return { notFound: true };
  }
};
