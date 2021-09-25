import { Fragment } from 'react';
import Head from 'next/head';

import { getFeaturedEvents, getEventById } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';

export default function DetailEventPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  const { id, title, date, location, image } = event;

  return (
    <Fragment>
      <Head>
        <title>NextJS Events | {title}</title>
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={id} />
    </Fragment>
  );
}

export const getStaticProps = async context => {
  const { id } = context.params;
  let data = await getEventById(id);

  return {
    props: {
      event: data,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { id: event.id } }));

  return {
    paths,
    fallback: true,
  };
};
