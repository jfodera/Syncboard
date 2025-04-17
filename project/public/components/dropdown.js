const DropdownSelect = ({ id, name, value, onChange }) => {
    // Map status text to your numeric values
    const statusToValue = {
        "To Do": "3",
        "In Progress": "2",
        "Completed": "1"
    };

    // Map numeric values to status text
    const valueToStatus = {
        "1": "Completed",
        "2": "In Progress",
        "3": "To Do"
    };

    // Map status values to colors
    const statusColors = {
        "1": "var(--yellow)",
        "2": "var(--lightblue)",
        "3": "none"
    };

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        // Call the parent's onChange with the text status
        onChange({
            target: {
                value: valueToStatus[selectedValue]
            }
        });
    };

    return (
        <div className="select">
            <select
                name={name}
                id={id}
                value={statusToValue[value] || "3"} // Convert status text to numeric value
                onChange={handleChange}
                style={{ backgroundColor: statusColors[statusToValue[value]] || "" }}
            >
                <option value="3">To Do</option>
                <option value="2">In Progress</option>
                <option value="1">Completed</option>
            </select>
        </div>
    );
};