const Profile = ({ name }) => {
    const [profile, setProfile] = React.useState({
        name: '',
        email: '',
        rin: '',
        year: '',
        major: ''
    });
    const [error, setError] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);

    // Fetch profile data
    React.useEffect(async () => {


        //session valildation 
        try {
            const rinRes = await fetch('/node/session/rin', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            let session = await rinRes.json()

            if (session['sessionMissing']) {
                //back to login
                window.location.href = '/';
            } else {
                rin = session['rin']
            }
        } catch (err) {
            console.error('Session Validation error:', err);
        }


        const fetchProfile = async () => {
            try {
                const response = await fetch(`https://syncboard.eastus.cloudapp.azure.com/profile/${name}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError("Failed to fetch profile");
                console.error(err);
            }
        };

        fetchProfile();
    }, [name]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission (update profile)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://syncboard.eastus.cloudapp.azure.com/node/profile/${name}`, {
            //local
               // const response = await fetch(`http://localhost:3000/profile/${name}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            setError("Failed to update profile");
            console.error(err);
        }
    };

    if (error) return <div>{error}</div>;
    if (!profile.name) return <div>Loading...</div>;

    return (
        <div>
            <Homebar />
            <div className="profile-title">Your Profile</div>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        <div className="status-indicator"></div>
                    </div>
                    <div className="profile-info">
                        <div className="name">{profile.name}</div>
                        <div className="email">{profile.email}</div>
                    </div>
                </div>

                {/* Edit Form */}
                {isEditing ? (
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="detail-row">
                            <label>Name:</label>
                            <input type="text" name="name" value={profile.name} onChange={handleChange} />
                        </div>
                        <div className="detail-row">
                            <label>Email:</label>
                            <input type="email" name="email" value={profile.email} onChange={handleChange} />
                        </div>
                        <div className="detail-row">
                            <label>RIN:</label>
                            <input type="text" name="rin" value={profile.rin} onChange={handleChange} />
                        </div>
                        <div className="detail-row">
                            <label>Year:</label>
                            <input type="text" name="year" value={profile.year} onChange={handleChange} />
                        </div>
                        <div className="detail-row">
                            <label>Major:</label>
                            <input type="text" name="major" value={profile.major} onChange={handleChange} />
                        </div>

                        <div className="form-actions">
                            <button type="submit" class="edit-profile-btn">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)} class="edit-profile-btn">Cancel</button>
                        </div>
                    </form>
                ) : (
                    // Display Profile Information
                    <div className="profile-details">
                        <div className="detail-row">
                            <span>Name</span>
                            <span>{profile.name}</span>
                        </div>
                        <hr />
                        <div className="detail-row">
                            <span>Email</span>
                            <span>{profile.email}</span>
                        </div>
                        <hr />
                        <div className="detail-row">
                            <span>RIN</span>
                            <span>{profile.rin}</span>
                        </div>
                        <hr />
                        <div className="detail-row">
                            <span>Year</span>
                            <span>{profile.year}</span>
                        </div>
                        <hr />
                        <div className="detail-row">
                            <span>Major</span>
                            <span>{profile.major}</span>
                        </div>
                        <button onClick={() => setIsEditing(true)} class="edit-profile-btn">Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};