const Resources = () => {
    const [resources, setResources] = React.useState([]);
    const [groupID, setGroupID] = React.useState(null);
    const [members, setMembers] = React.useState([]);
    const [newResName, setNewResName] = React.useState("");
    const [newResLink, setNewResLink] = React.useState("");
    const [classID, setClassID] = React.useState(null);
  
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
  
// getting the class id
    React.useEffect(() => {
      if (!groupID) return;
      const fetchGroupDetails = async () => {
        try {
          const groupRes = await fetch(`/groups/${groupID}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          const groupData = await groupRes.json();
          if (groupData.crn) {
            setClassID(groupData.crn);
          }
        } catch (err) {
          console.error('Error fetching group details:', err);
        }
      };
      fetchGroupDetails();
    }, [groupID]);
  
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
  
    // Fetch group members for the given group
    React.useEffect(() => {
      if (!groupID) return;
      const fetchGroupMembers = async () => {
        try {
          const groupRes = await fetch(`/groups/${groupID}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          const groupData = await groupRes.json();
          if (groupData.students && groupData.students.length > 0) {
            const memberPromises = groupData.students.map((rin) =>
              fetch(`/profile/${rin}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
              }).then((res) => res.json())
            );
            const membersData = await Promise.all(memberPromises);
            setMembers(membersData);
          } else {
            setMembers([]);
          }
        } catch (err) {
          console.error('Error fetching group members:', err);
        }
      };
      fetchGroupMembers();
    }, [groupID]);
  
    // Handle resource form submission
    const handleAddResource = async (e) => {
      e.preventDefault();
      if (!newResName || !newResLink || !classID) {
        alert("Please fill in all fields.");
        return;
      }
      try {
        const res = await fetch(`/resources/${groupID}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resourcename: newResName,
            link: newResLink,
            classid: classID,
          }),
        });
        const data = await res.json();
        if (data.error) {
          alert("Error adding resource: " + data.error);
        } else {
          const updatedResources = await fetch(`/resources/${groupID}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          const resourcesData = await updatedResources.json();
          setResources(resourcesData);
          setNewResName("");
          setNewResLink("");
        }
      } catch (err) {
        console.error('Error adding resource:', err);
        alert("Error adding resource.");
      }
    };
  
    return (
      <div id="resourcePage">
        <Homebar />
        <div className="secondContent">
          <h1>Links & Resources</h1>
          <form onSubmit={handleAddResource} style={{ marginBottom: '20px' }}>
            <h2>Add New Resource</h2>
            <div>
              <label>Resource Name:</label>
              <input
                type="text"
                value={newResName}
                onChange={(e) => setNewResName(e.target.value)}
                placeholder="Enter resource name"
              />
            </div>
            <div>
              <label>Link:</label>
              <input
                type="text"
                value={newResLink}
                onChange={(e) => setNewResLink(e.target.value)}
                placeholder="Enter URL"
              />
            </div>
            <button type="submit">Add Resource</button>
          </form>
          <table className="resourcesTable">
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>LINK</th>
              </tr>
            </thead>
            <tbody>
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
  
          <h1>Group Members</h1>
          <table className="resourcesTable">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {members && members.filter(m => m != null).length > 0 ? (
                members
                  .filter((member) => member && member.rin)
                  .map((member) => (
                    <tr key={member.rin}>
                      <td>{member.name || 'Unknown'}</td>
                      <td>{member.email || 'Unknown'}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="2">No group members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  