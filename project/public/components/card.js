const Card = ({ title, schedule, location, color }) => {
    const cardStyle = {
        backgroundColor: `var(${color})`, 
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px var(--shadow)",
        width: "250px",
        color: "#333",
    };

    return (
        <div style={cardStyle}>
            <h3>{title}</h3>
            <p>{schedule}</p>
            <p>{location}</p>
        </div>
    );
};