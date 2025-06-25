import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Responsive.css';
import { Modal, Button, Form } from "react-bootstrap";
import moment from "moment";
import MyCalendar from './components/MyCalendar';
import SideNavBar from './components/SideNavBar';
import EventListPage from "./components/EventListPage";


function EditEventModal({ show, handleClose, event, onSave }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [color, setColor] = useState("#1164EE");
  const [error, setError] = useState("");
  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStart(new Date(event.start));
      setEnd(new Date(event.end));
      setColor(event.color || "#1164EE");
      setError("");
    }
  }, [event]);

  const handleStartChange = (e) => {
    const newStart = new Date(e.target.value);
    setStart(newStart);

    if (newStart >= end) {
      const newEnd = new Date(newStart.getTime() + 30 * 60 * 1000);
      setEnd(newEnd);
    }
  };

  const handleEndChange = (e) => {
    const newEnd = new Date(e.target.value);
    setEnd(newEnd);
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }

    if (end <= start) {
      setError("End time must be after start time.");
      return;
    }

    onSave({ ...event, title, start, end, color });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="my-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={moment(start).format("YYYY-MM-DDTHH:mm")}
              onChange={handleStartChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={moment(end).format("YYYY-MM-DDTHH:mm")}
              onChange={handleEndChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ height: "40px", border: "none", padding: "0", width:"100%" }}
            />
          </Form.Group>

          {error && (
            <div style={{ color: "crimson", fontSize: "0.9rem", marginTop: "10px" }}>
              {error}
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}





function App() {

  const nav = useNavigate();
  //to go to the home on start
  useEffect(()=>{
    nav('/')
  },[])

  //initial
  const getInitialEvents = () => {
    const stored = localStorage.getItem('calendar-events');
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.map(e => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end)
    }));
  };
  

  // Global Event listing
  const [Gevents, setGEvents] = useState(getInitialEvents());
  
  // effecct
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(Gevents));
  }, [Gevents]);


  // state for date
  const [defaultDate, setDefaultDate] = useState(new Date());

  const [editingEvent, setEditingEvent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  console.log(Gevents);
  const [myStyle, setMyStyle] = useState({
    '--event-bg-color': '#1164EE',    
    '--theme-color': '#2f4b7c',        
    '--today-bg-color': '#cfe2ff',     
    '--event-text-color': '#003f5c'  
  });
  
  const toggleStyle = () => {
    if (myStyle['--theme-color'] === '#2f4b7c') {
      setMyStyle({
        '--event-bg-color': '#1164EE',   
        '--theme-color': '#f9844a',      
        '--today-bg-color': '#fff3cd', 
        '--event-text-color': '#f9844a'
      });
    } else if (myStyle['--theme-color'] === '#f9844a') {
      setMyStyle({
        '--event-bg-color': '#1164EE',
        '--theme-color': '#2f4b7c',
        '--today-bg-color': '#cfe2ff',
        '--event-text-color': '#003f5c' 
      });
    }
  };
  

  
  
  return (
    <div  className="app" style={myStyle}>
    <EditEventModal
  show={editModalOpen}
  handleClose={() => setEditModalOpen(false)}
  event={editingEvent}
  onSave={(updatedEvent) => {
    setGEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  }}
/>

    <SideNavBar  toggleStyle={toggleStyle} />
    <Routes>
      <Route path="/" element={<MyCalendar  className='p-4' style={myStyle} 
    defaultDate={defaultDate}
    events={Gevents}
    setEvents={setGEvents}
    />}/>
    </Routes>
    <Routes>
      <Route path="/react-calendar" element={<MyCalendar  className='p-4' style={myStyle} 
    defaultDate={defaultDate}
    events={Gevents}
    setEvents={setGEvents}
    />}/>
    </Routes>
    <Routes>
      <Route path="/events" element={<EventListPage
  eventss={Gevents}
  onDelete={(id) => setGEvents(prev => prev.filter(e => e.id !== id))}
  onEdit={(event) => {
    setEditingEvent(event);
    setEditModalOpen(true);
  }}
/>
}/>
    </Routes>

    </div>
  );
}
export default App;
