const Resources = () =>{
    return(
        <div>
            <Homebar/>
            <div className="secondContent">
                <h2>Resources</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    <tr>
                        <td>Mike Peters</td>
                        <td>Member</td>
                        <td>petem@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    <tr>
                        <td>Sasha Brown</td>
                        <td>Member</td>
                        <td>brows@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    <tr>
                        <td>Brian Callahan</td>
                        <td>Professor</td>
                        <td>callab5@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    <tr>
                        <td>Priyanka Mandloi</td>
                        <td>TA</td>
                        <td>mandlp@rpi.edu</td>
                        <td>(123)456-7890</td>
                    </tr>
                    
                </table>
            </div>
        </div>
        
    );
};