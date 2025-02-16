const Workspaces = () => {
    const workspaces = [
        { title: "Web Science", schedule: "Tuesday/Friday 12pm-1:50pm", location: "Lally 102", color: "--orange" },
        { title: "Class 2", schedule: "Tuesday/Friday 8:00-9:50am", location: "Sage 2510", color: "--yellow" },
        { title: "Class 3", schedule: "Monday/Thursday 2:00-3:50pm", location: "DCC 337", color: "--blue" }
    ];

    return (
        <div className="workspaces">
            {workspaces.map((workspace, index) => (
                <Card key={index} {...workspace} />
            ))}
        </div>
    );
};
