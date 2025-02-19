const Profile = () => {
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
                      <div className="name">Todd Richardson</div>
                      <div className="email">richat@rpi.edu</div>
                  </div>
              </div>

              <div className="profile-details">
                  <div className="detail-row">
                      <span>Name</span>
                      <span>Todd Richardson</span>
                  </div>
                  <hr />
                  <div className="detail-row">
                      <span>Email</span>
                      <span>richat@rpi.edu</span>
                  </div>
                  <hr />
                  <div className="detail-row">
                      <span>RIN</span>
                      <span>662098475</span>
                  </div>
                  <hr />
                  <div className="detail-row">
                      <span>Year</span>
                      <span>2026</span>
                  </div>
                  <hr />
                  <div className="detail-row">
                      <span>Major</span>
                      <span>ITWS</span>
                  </div>
              </div>
          </div>
      </div>
    );
};