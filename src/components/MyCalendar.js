import { Calendar, momentLocalizer } from "react-big-calendar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { useState } from "react";
import MyModal from "./MyModal";
//dnd calendar
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

// react BasicCalendar component
const BasicCalendar = ({defaultDate,events,setEvents}) => {
  //states for creating event
  const [modalStatus, setModalStatus] = useState(false);
  const [eventInput, setEventInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //state for on select event
  const [eventId, setEventId] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  // color handling
  const [eventColor, setEventColor] = useState('#1164EE');
  const handleColorChange = (e) => {
    setEventColor(e.target.value);
  };

  // sorting
  const sortByStartTime = (events) => {
    return events.sort((a, b) => new Date(a.start) - new Date(b.start));
  };
  
  const handleClose = () => {
    setModalStatus(false);
    setEditStatus(false);
    setEventInput("");
    setEventId("");
    setStartDate("");
    setEndDate("");
    setEventColor('#1164EE');
  };
  
  const handleChange = (e) => {
    setEventInput(e.target.value);
  };

  const handleSave = () => {
    if (!eventInput.trim()) {
      toast.error("Title can't be empty");
      return;
    }
    setModalStatus(false);
    setEvents([
      ...events,
      {
        id: Date.now(),
        title: eventInput,
        start: new Date(startDate),
        end: new Date(endDate),
        color: eventColor,
      },
    ]);
  };
  

  //slot select handler
  const handleSlotSelectEvent = (slotInfo) => {
    if (slotInfo.action === "click" || slotInfo.action === "select") {
      setStartDate(new Date(slotInfo.start));
      setEndDate(new Date(slotInfo.end));
      setModalStatus(true);
      setEventInput("");
    }
  };

  //move event handler
  const moveEventHandler = ({ event, start, end }) => {
    const updatedEvents = events.filter((e) => e.id !== event.id);
    const reordered = [
      ...updatedEvents,
      {
        id: event.id,
        title: event.title,
        start: new Date(start),
        end: new Date(end),
        color: event.color || '#1164EE',
      },
    ];
    setEvents(sortByStartTime(reordered));
  };
  
  
  //resize event handler
  const resizeEventHandler = ({ event, start, end }) => {
    const updatedEvents = events.filter((e) => e.id !== event.id);
    const reordered = [
      ...updatedEvents,
      {
        id: event.id,
        title: event.title,
        start: new Date(start),
        end: new Date(end),
        color: event.color || '#1164EE',
      },
    ];
    setEvents(sortByStartTime(reordered));
  };
  
  

  //on select event handler
  const hanldeOnSelectEvent = (e) => {
    setEditStatus(true);
    setStartDate(new Date(`${e.start}`));
    setEndDate(new Date(`${e.end}`));
    setEventInput(e.title);
    setEventId(e.id);
    setModalStatus(true);
    setEventColor(e.color || '#1164EE');
  };

  const handleEditEvent = (e) => {
    setEventInput(e.target.value);
  };
  const handleEdited = (e) => {
    setModalStatus(false);
    let updatedEvents = events.filter((e) => e.id !== eventId);
  
    if (eventInput) {
      setEvents([
        ...updatedEvents,
        {
          id: eventId,
          title: eventInput,
          start: new Date(startDate),
          end: new Date(endDate),
          color: eventColor, 
        },
      ]);
    } else {
      // If the input is empty, delete the event
      setEvents([...updatedEvents]);
    }
  
    setEditStatus(false);
    setEventInput("");
  };
  

  // on delete event handler
  const handleDelete = () => {
    const eventExists = events.some((e) => e.id === eventId);
  
    const updatedEvents = events.filter((e) => e.id !== eventId);
    setEvents([...updatedEvents]);
    setModalStatus(false);
    setEventInput("");
  
    if (eventExists) {
      toast.error("Event deleted");
    }
  };
  

  return (
    <div className="my-calendar">
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        //event trigger after clicking any slot
        onSelectSlot={handleSlotSelectEvent}
        //event trigger after clicking any event
        onSelectEvent={hanldeOnSelectEvent}
        //event for drag and drop
        onEventDrop={moveEventHandler}
        //event trigger hen resizing any event
        resizable
        onEventResize={resizeEventHandler}
        // onSelecting={slot => false}
        longPressThreshold={10}
        defaultDate={defaultDate}

        //color
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || 'var(--event-bg-color)',
            color: '#fff',
            borderRadius: '6px',
            padding: '4px 6px',
          }
        })}

      />
      <ToastContainer position="bottom-center" autoClose={3000} />

      <MyModal
        modalStatus={modalStatus}
        handleClose={handleClose}
        handleSave={handleSave}
        handleChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        eventInput={eventInput}
        handleEditEvent={handleEditEvent}
        handleEdited={handleEdited}
        editStatus={editStatus}
        handleDelete={handleDelete}
        eventColor={eventColor}
        handleColorChange={handleColorChange}
      />
    </div>
  );
};

export default BasicCalendar;
