export const URL =
  'https://nextjs-course-982c3-default-rtdb.asia-southeast1.firebasedatabase.app/events.json';

async function getData(url = URL) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data) {
      throw new Error('data not found');
    }

    const events = [];
    for (const key in data) {
      events.push({ id: key, ...data[key] });
    }

    return events;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllEvents() {
  return getData();
}

export async function getFeaturedEvents() {
  const featuredEventsUrl = `${URL}?orderBy="isFeatured"&equalTo=true`;

  return getData(featuredEventsUrl);
}

export async function getEventById(id) {
  const events = await getData();
  const event = events.find(event => event.id === id);

  return !event ? null : event;
}

export async function getFilteredEvents(dateFilter) {
  const events = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
