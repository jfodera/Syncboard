

const DropdownSelect = ({ id, name }) => {
    const [color, setColor] = React.useState();

    onClick: () => { 
        setColor();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    return (
        <div className="select">
            <select name={name} id={id}>
                <option>Status</option>
                <option className="blue" value="1" onChange={handleChange}>Completed</option>
                <option value="2" onClick='setColor("yellow")'>In Progress</option>
                <option selected value="3">To Do</option>
            </select>
        </div>
    );
};