const Dashboard = () => {
  return (
    <div>
      <Homebar />
      <div className="mainContent">
      <div className="left">
        <h1>Team Calendar</h1>
        <div class="fullCal-component">
         <CalendarComponent />
        </div>
    </div>

        <div className="right">
          <h1>Tasks</h1>
          <Tasks />
        </div>
      </div>
    </div>
  );
};
