const Tasks = () => {
    return (
        <div>
            <table className="tasks">
                <tr>
                    <th>TASK</th>
                    <th>STATUS</th>
                </tr>
                <tr>
                    <td>Proposal presentation</td>
                    <td>
                        <div className="select">
                        <DropdownSelect id="slct" name="slct" />
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>UI Mockups</td>
                    <td>
                        <div className="select">
                            <DropdownSelect id="selectTwo" name="selectTwo" />
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>Frontend Implementation</td>
                    <td>
                        <div className="select">
                            <DropdownSelect id="selectThree" name="selectThree" />
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>Midterm Presentation</td>
                    <td>
                        <div className="select">
                            <DropdownSelect id="selectFour" name="selectFour" />
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>Backend Implementation</td>
                    <td>
                        <div className="select">
                            <DropdownSelect id="selectFive" name="selectFive" />
                        </div>
                    </td>
                </tr>

                
            </table>
        </div>
        
    );
};