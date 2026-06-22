import "./Profile.css";

function Profile() {
  document.title = "Bro's-Mart | Profile";

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-avatar">👤</div>
        <h1>My Profile</h1>
        <p className="profile-sub">Manage your account details and orders</p>

        <div className="profile-info">
          <div className="profile-row">
            <span>👤 Name</span>
            <p>Coming soon after login</p>
          </div>
          <div className="profile-row">
            <span>📧 Email</span>
            <p>Coming soon after login</p>
          </div>
          <div className="profile-row">
            <span>📱 Mobile</span>
            <p>Coming soon after login</p>
          </div>
          <div className="profile-row">
            <span>📦 My Orders</span>
            <p>No orders yet</p>
          </div>
        </div>

        <p className="profile-note">⚙️ Full profile will be available after backend integration.</p>
      </div>
    </div>
  );
}

export default Profile;