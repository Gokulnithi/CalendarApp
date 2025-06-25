import { useState } from 'react';
import moment from 'moment';
import "./EventList.css"
const EventListPage = ({ eventss,onDelete,onEdit  }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const filtered = eventss.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
    <div className="event-list-page">
      <h2>All Events</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search eventss..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        />
        {showDropdown && query.length > 0 && (
          <ul className="autocomplete-dropdown">
            {filtered.map(event => (
              <li key={event.id} onClick={() => setQuery(event.title)}>
                {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="event-scroll-container">
  {(query ? filtered : eventss).length === 0 ? (
    <div className="no-events">No events found</div>
  ) : (
    (query ? filtered : eventss).map(event => (
      <div key={event.id}
      className={`event-card ${highlightedId === event.id ? "highlighted" : ""}`}
      style={{ backgroundColor: event.color || 'var(--bg-color)', color: '#fff' }}>
        <div className="event-content">
          <div>
            <strong>{event.title}</strong><br />
            {moment(event.start).format('MMM D, h:mm A')} →{' '}
            {moment(event.end).format('MMM D, h:mm A')}
          </div>
          <div className="event-actions">
  <button
    className="edit-btn"
    onClick={() => onEdit(event)}
    title="Edit event"
  >
    ✎
  </button>
  <button className="delete-btn" onClick={() => onDelete(event.id)}>
    ✕
  </button>
</div>

        </div>
      </div>
    ))
  )}
</div>




    </div>
    </>
  );
};

export default EventListPage;
