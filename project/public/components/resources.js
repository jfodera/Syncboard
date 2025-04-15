const Resources = () => {
    const [resources, setResources] = React.useState([]);
    const [groupID, setGroupID] = React.useState(null);
  
    // Validate session on mount
    React.useEffect(() => {
      const validateSession = async () => {
        try {
          const rinRes = await fetch('/session/rin', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          const session = await rinRes.json();
          if (session.sessionMissing) {
            // Redirect to login if session is missing
            window.location.href = '/';
          }
        } catch (err) {
          console.error('Session validation error:', err);
        }
      };
      validateSession();
    }, []);
  
    // Get the group ID from the session
    React.useEffect(() => {
      const fetchGroupID = async () => {
        try {
          const res = await fetch('/session/groupID', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          if (data.error) {
            console.error('Error fetching group ID:', data.error);
          } else {
            setGroupID(data.groupid);
          }
        } catch (err) {
          console.error('Group ID fetch error:', err);
        }
      };
      fetchGroupID();
    }, []);
  
    // Fetch resources for the given group
    React.useEffect(() => {
      if (!groupID) return;
      const fetchResources = async () => {
        try {
          const res = await fetch(`/resources/${groupID}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          setResources(data);
        } catch (err) {
          console.error('Error fetching resources:', err);
        }
      };
      fetchResources();
    }, [groupID]);
  
    return (
      <div id="resourcePage">
        <Homebar />
        <div className="secondContent">
          <h1>Links & Resources</h1>
          <table className="resourcesTable">
            <tbody>
              <tr>
                <th>DESCRIPTION</th>
                <th>LINK</th>
              </tr>
              {resources.length > 0 ? (
                resources.map((resource) => (
                  <tr key={resource.resourceid}>
                    <td>{resource.resourcename}</td>
                    <td>
                      <a
                        href={
                          resource.link.startsWith('http')
                            ? resource.link
                            : `http://${resource.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.link}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No resources found.</td>
                </tr>
              )}
            </tbody>
          </table>
  
          <h1>Contact Information</h1>
          <table className="resourcesTable">
            <tbody>
              <tr>
                <th>NAME</th>
                <th>ROLE</th>
                <th>EMAIL</th>
                <th>PHONE</th>
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
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  