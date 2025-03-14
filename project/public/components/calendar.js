const CalendarComponent = () => {
    React.useEffect(() => {
        const calendarEl = document.getElementById('calendar');

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            selectable: true,
            editable: true,
            events: [
                {
                    title: 'Example Event',
                    start: new Date().toISOString().slice(0, 10),
                    extendedProps: { location: 'Room 101' }
                }
            ],
            dateClick: function(info) {
                const title = prompt("Event Title:");
                const startTime = prompt("Start Time (HH:MM, 24hr):", "12:00");
                const endTime = prompt("End Time (HH:MM, 24hr):", "13:00");
                const location = prompt("Location:");
            
                if (title && startTime && endTime) {
                    const dateStr = info.dateStr;
                    const startDateTime = `${dateStr}T${startTime}`;
                    const endDateTime = `${dateStr}T${endTime}`;
            
                    calendar.addEvent({
                        title,
                        start: startDateTime,
                        end: endDateTime,
                        extendedProps: { location }
                    });
                }
            },
            eventClick: function(info) {
                const event = info.event;
                const action = prompt("Type 'delete' to remove or 'edit' to update:", "delete");
            
                if (action === "delete") {
                    event.remove();
                } else if (action === "edit") {
                    const newTitle = prompt("New title:", event.title);
                    const newStartTime = prompt("New start time (HH:MM, 24hr):", event.start.toISOString().slice(11, 16));
                    const newEndTime = prompt("New end time (HH:MM, 24hr):", event.end ? event.end.toISOString().slice(11, 16) : "");
                    const newLocation = prompt(
                        "New location:",
                        (event.extendedProps && event.extendedProps.location) || ""
                    );
            
                    if (newTitle && newStartTime && newEndTime) {
                        const dateStr = event.start.toISOString().slice(0, 10);
                        const newStart = `${dateStr}T${newStartTime}`;
                        const newEnd = `${dateStr}T${newEndTime}`;
            
                        event.setProp("title", newTitle);
                        event.setStart(newStart);
                        event.setEnd(newEnd);
                        event.setExtendedProp("location", newLocation);
                    }
                }
            }                        
        });

        calendar.render();
    }, []);

    return <div id="calendar"></div>;
};
