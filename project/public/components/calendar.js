// replace this with session variables
const sessiongroupid = 2;

function CreateEventModal({ isOpen, onClose, onSubmit, eventData }) {
  if (!isOpen) return null;

  const container = document.createElement('div');
  container.innerHTML = `
    <div class="modal-overlay">
      <form id="create-event-form" class="modal">
        <h3>Create Event</h3>
        <label>Event Name: <input type="text" id="createevent-title" placeholder="New Event"/></label><br/>
        <label>Date: <input type="date" id="createevent-date" /></label><br/>
        <div class="modal-allday-wrapper">
          <input type="checkbox" class="modal-allday" id="createevent-allday" /> All Day?<br/>
        </div>
        <div id="time-inputs">
          <label>Start Time: <input type="time" id="createevent-start" /></label>
          <label>End Time: <input type="time" id="createevent-end" /></label>
        </div><br/>
        <button type="submit" class="modal-save-btn" id="submit-createevent">Submit</button>
        <button type="button" class="modal-close-btn" id="close-create-modal">Close</button>
      </form>
    </div>
  `;

  document.body.appendChild(container);
  document.getElementById("createevent-date").value = eventData.date;
  const allDayCheckbox = document.getElementById('createevent-allday');
  const timeInputs = document.getElementById('time-inputs');

  allDayCheckbox.addEventListener('change', () => {
    if (allDayCheckbox.checked) {
      timeInputs.style.display = 'none';
    } else {
      timeInputs.style.display = 'block';
    }
  });

  document.getElementById('create-event-form').onsubmit = async (e) => {
    e.preventDefault();
    const title = document.getElementById('createevent-title').value;
    const date = document.getElementById('createevent-date').value;
    const allDay = allDayCheckbox.checked;
    const starttime = allDay ? null : document.getElementById('createevent-start').value;
    const endtime = allDay ? null : document.getElementById('createevent-end').value;
    await onSubmit({ title, date, starttime, endtime, allDay });
    document.body.removeChild(container);
  };
  document.getElementById('close-create-modal').onclick = () => {
    document.body.removeChild(container);
    onClose();
  };
}

function EditEventModal({ isOpen, onClose, onSubmit, onDelete, eventData }) {
  if (!isOpen || !eventData) return null;

  const container = document.createElement('div');
  container.innerHTML = `
    <div class="modal-overlay">
      <div class="modal">
        <h3>Edit Event</h3>
        <label for="editevent-name">Event Name:</label>
        <input type="text" id="editevent-name" value="${eventData.title}" />
        <label for="editevent-date">Date:</label>
        <input type="date" id="editevent-date" value="${eventData.extendedProps && eventData.extendedProps.date ? eventData.extendedProps.date : eventData.startStr.slice(0, 10)}" />
        
        <div class="modal-allday-wrapper">
          <input type="checkbox" class="modal-allday" id="editevent-allday" ${eventData.extendedProps && eventData.extendedProps.allday ? 'checked' : ''} /> 
          <label for="editevent-allday">All Day?</label>
          </div>
        
        <div id="starttime-container">
          <label for="editevent-start">Start Time:</label>
          <input type="time" id="editevent-start" value="${eventData.extendedProps.starttime ? eventData.extendedProps.starttime : eventData.startStr.slice(11, 16)}" />
        </div>
        
        <div id="endtime-container">
          <label for="editevent-end">End Time:</label>
          <input type="time" id="editevent-end" value="${eventData.extendedProps && eventData.extendedProps.endtime ? eventData.extendedProps.endtime : eventData.endStr.slice(11, 16)}" />
        </div>

        <button class="modal-save-btn" id="submit-editevent" type="submit">Save</button>
        <button class="modal-delete-btn" id="delete-editevent" type="button">Delete</button>
        <button class="modal-close-btn" id="close-edit-modal">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const allDayCheckbox = document.getElementById('editevent-allday');
  const startInput = document.getElementById('editevent-start');
  const endInput = document.getElementById('editevent-end');
  const startContainer = document.getElementById('starttime-container');
  const endContainer = document.getElementById('endtime-container');

  if (allDayCheckbox.checked) {
    startContainer.style.display = 'none';
    endContainer.style.display = 'none';
    startInput.disabled = true; 
    endInput.disabled = true;
  }
  allDayCheckbox.addEventListener('change', () => {
    if (allDayCheckbox.checked) {
      startContainer.style.display = 'none';  
      endContainer.style.display = 'none';
      startInput.disabled = true;  
      endInput.disabled = true;
    } else {
      startContainer.style.display = 'block';  
      endContainer.style.display = 'block';
      startInput.disabled = false; 
      endInput.disabled = false;
    }
  });

  document.getElementById('submit-editevent').onclick = async () => {
    const title = document.getElementById('editevent-name').value;
    const date = document.getElementById('editevent-date').value;
    const starttime = allDayCheckbox.checked ? null : document.getElementById('editevent-start').value;
    const endtime = allDayCheckbox.checked ? null : document.getElementById('editevent-end').value;
    await onSubmit({ title, date, starttime, endtime });
    document.body.removeChild(container);
  };

  document.getElementById('delete-editevent').onclick = async () => {
    await onDelete(eventData);
    document.body.removeChild(container);
  };

  document.getElementById('close-edit-modal').onclick = () => {
    document.body.removeChild(container);
    onClose();
  };
}


// calendar component
const CalendarComponent = () => {
  const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const [eventData, setEventData] = React.useState(null);
  const [calendar, setCalendar] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const fetchEvents = async () => {
    try {
      const res = await fetch(`/calendar/${sessiongroupid}`);
      const data = await res.json();
      const formattedEvents = data
      .filter(event => !event.deleted)
      .map(event => {
        const { eventname, date, starttime, endtime, eventid, groupid, allday } = event;
        return {
          id: eventid,
          title: eventname,
          start: allday ? date : `${date}T${starttime}`,
          end: allday ? null : `${date}T${endtime}`, 
          allDay: allday,
          extendedProps: {
            groupid,
            eventid,
            allday,
            starttime,
            endtime,
            date
          },
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // run when event is created, post to db
  const handleCreateSubmit = async ({ title, date, starttime, endtime, allDay }) => {
    try {
      await fetch(`/calendar/${sessiongroupid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventname: title, starttime, endtime, date, allday: allDay }),
      });
      await fetchEvents();
    } catch (err) {
      console.error('Error creating event:', err);
    }
    setCreateModalOpen(false);
  };

  const handleDeleteEvent = async (eventData) => {
    try {
      const eventId = eventData.extendedProps.eventid;
  
      const response = await fetch(`/calendar/${sessiongroupid}/${eventId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
  
      console.log('Event deleted successfully');
      await fetchEvents(); 
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditSubmit = async () => {
    const nameInput = document.getElementById('editevent-name');
    const dateInput = document.getElementById('editevent-date');
    const startInput = document.getElementById('editevent-start');
    const endInput = document.getElementById('editevent-end');
    const allDayCheckbox = document.getElementById('editevent-allday');

    const updatedName = nameInput.value.trim() || eventData.title;
    const updatedDate =
      dateInput.value ||
      (eventData.extendedProps && eventData.extendedProps.date) ||
      eventData.startStr.slice(0, 10);
    
    let updatedStart = startInput.value ||
      (eventData.extendedProps && eventData.extendedProps.starttime) ||
      eventData.startStr.slice(11, 16);
    
    let updatedEnd = endInput.value ||
      (eventData.extendedProps && eventData.extendedProps.endtime) ||
      eventData.endStr.slice(11, 16);
    
    const isAllDay = allDayCheckbox.checked;

    if (isAllDay) {
        updatedStart = null;
        updatedEnd = null;
    }

    const updateData = {
      eventname: updatedName,
      date: updatedDate,
      starttime: updatedStart,
      endtime: updatedEnd,
      allday: isAllDay,
    };

    try {
      await fetch(`/calendar/${sessiongroupid}/${eventData.extendedProps && eventData.extendedProps.eventid}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        }
      );
      await fetchEvents();
      setEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };


  React.useEffect(() => {
    fetchEvents();
  }, []);

  React.useEffect(() => {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    const newCalendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek',
      },
      selectable: true,
      editable: true,
      events,
      dateClick: function (info) {
        setEventData({ date: info.dateStr });
        setCreateModalOpen(true);
      },
      eventClick: function (info) {
        setEventData(info.event);
        setEditModalOpen(true);
      },
    });
    newCalendar.render();
    setCalendar(newCalendar);
    return () => newCalendar.destroy();
  }, [events]);

  return (
    <div>
      <div id="calendar"></div>
      {isCreateModalOpen && (
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateSubmit}
          eventData={eventData}
        />
      )}
      {isEditModalOpen && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)} 
          onSubmit={handleEditSubmit}
          onDelete={handleDeleteEvent}
          eventData={eventData}
        />
      )}
    </div>
  );
};