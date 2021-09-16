import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import { getFeaturedEvents } from '../../dummy-data';

function AllEventsPage() {
  const router = useRouter();
  const featuredEvents = getFeaturedEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={featuredEvents} />
    </Fragment>
  );
}

export default AllEventsPage;
