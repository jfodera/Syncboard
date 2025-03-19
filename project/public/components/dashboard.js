const Dashboard = () => {
  return (
    <div>
      <Homebar />
      <div className="mainContent">
      <div className="left">
        <h2>Team Calendar</h2>
        <CalendarComponent />
    </div>

        <div className="right">
          <h2>Tasks</h2>
          <Tasks />
        </div>
      </div>
    </div>
  );
};
