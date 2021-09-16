import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div className={styles.container}>
      <EventList items={featuredEvents} />
    </div>
  );
}
