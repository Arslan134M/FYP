import React from "react";

const ProfileCard = () => {
  return (
    <div className="profile-intro card shadow  border-0 text-center">
      <div className="pi-header">
        <div className="card-image layer">
          <img
            className="avatar-circle"
            src="https://via.placeholder.com/260x260"
            alt="Team Member"
          />
        </div>
      </div>
      <div className="pi-content">
        <h4>Robert Johnson</h4>
        <p>Designer</p>
        <p className="card-text">
          Hello everyone, I am Maryam. My designs are used in several big
          companies in United State and other countries.
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
