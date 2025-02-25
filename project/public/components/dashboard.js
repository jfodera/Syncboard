const Dashboard = () => {
    return (
        <div>
            <Homebar />
            <div className="mainContent">
                <div className="left">
                    <h2>Team Calendar</h2>
                    <iframe className="iframe-style"
                        src="https://calendar.google.com/calendar/embed?src=websciteam1%40gmail.com&ctz=America%2FNew_York">
                        
                    </iframe>
                </div>
                <div className="right">
                    <h2>Tasks</h2>
                     <Tasks />
                </div>
            </div>
            
        </div>
        
    );
};