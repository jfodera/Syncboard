const Tasks = () => {
    const [groupId, setGroupId] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        const fetchGroupID = async () => {
            try {
                const response = await fetch('/session/groupID', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setGroupId(data.groupid); // assuming { groupid: 1 }
            } catch (error) {
                console.error('Error fetching groupID:', error);
            }
        };

        fetchGroupID();
    }, []);

    React.useEffect(() => {
        if (groupId !== null) {
            fetch(`/tasks/${groupId}`)
                .then((res) => res.json())
                .then((data) => setTasks(data))
                .catch((err) => console.error('Failed to fetch tasks:', err));
        }
    }, [groupId]);

    const addTask = () => {
        setTasks([...tasks, { task: 'Placeholder', status: 'To do' }]);
    };

    const handleTaskChange = (index, newName) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].task = newName;
        setTasks(updatedTasks);
    };

    return (
        <div className="tasks-module">
            <div className="tasks-wrapper">
                <table className="tasks">
                    <tbody className="tasks-body">
                        <tr>
                            <th>TASK</th>
                            <th className="status-selector">STATUS</th>
                        </tr>
                    </tbody>

                    <tbody className="tasks-body">
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>
                                    {task.task === 'Placeholder' ? (
                                        <form>
                                            <input
                                                type="text"
                                                onBlur={(e) => handleTaskChange(index, e.target.value)}
                                            />
                                        </form>
                                    ) : (
                                        task.task
                                    )}
                                </td>
                                <td className="status-selector">
                                    <DropdownSelect
                                        id={`select${index}`}
                                        name={`select${index}`}
                                        value={task.status}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <br />
            <span className="material-symbols-outlined circle" onClick={addTask}>
                add_circle
            </span>
        </div>
    );
};