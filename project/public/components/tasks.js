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

    const addTask = async () => {
        if (groupId === null) return;
    
        try {
            const response = await fetch(`/tasks/${groupId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: 'Placeholder' }),
            });
    
            if (!response.ok) throw new Error('Failed to create task');
    
            const data = await response.json();
            const newTask = {
                taskid: data.taskId,
                task: 'Placeholder',
                status: 'To Do', // Make sure this matches your dropdown options
                isEditing: true,
            };
    
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    
    const handleTaskChange = async (index, newName) => {
        const taskToUpdate = tasks[index];
    
        try {
            await fetch(`/tasks/${groupId}/${taskToUpdate.taskid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: newName }),
            });
    
            const updatedTasks = [...tasks];
            updatedTasks[index].task = newName;
            updatedTasks[index].isEditing = false;
            setTasks(updatedTasks);
        } catch (err) {
            console.error('Error updating task name:', err);
        }
    };

    const handleStatusChange = async (index, newStatus) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].status = newStatus;
        setTasks(updatedTasks);
    
        const taskid = updatedTasks[index].taskid;
        try {
            await fetch(`/tasks/${groupId}/${taskid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (err) {
            console.error('Failed to update task status:', err);
            // Revert if there's an error
            updatedTasks[index].status = tasks[index].status;
            setTasks(updatedTasks);
        }
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
                                {task.isEditing ? (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const value = e.target.elements[`input${index}`].value.trim();
                                            if (value) {
                                                handleTaskChange(index, value);
                                            }
                                        }}
                                    >
                                        <input
                                            name={`input${index}`}
                                            type="text"
                                            autoFocus
                                            defaultValue=""
                                            onBlur={(e) => {
                                                const value = e.target.value.trim();
                                                if (value) handleTaskChange(index, value);
                                            }}
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
                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                disabled={task.isUpdating}
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