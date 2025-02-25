const DropdownSelect = ({ id, name }) => {
    const [color, setColor] = React.useState("");

    const handleChange = (e) => {
        const selectedValue = e.target.value;
     
        switch (selectedValue) {
            case "1":
                setColor("var(--blue)"); 
                break;
            case "2":
                setColor("var(--yellow)"); 
                break;
            default:
                setColor("");
        }
    };

    return (
        <div className="select">
            <select name={name} id={id} onChange={handleChange} style={{ backgroundColor: color }}>
                <option>Status</option>
                <option value="1">Completed</option>
                <option value="2">In Progress</option>
                <option selected value="3">To Do</option>
            </select>
        </div>
    );
};