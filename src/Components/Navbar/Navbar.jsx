import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>FertilizerCorp</h2>
          <span>Supply Chain Management</span>
        </div>

        <div className="navbar-menu">
          <a href="#dashboard" className="navbar-item active">
            Dashboard
          </a>
          
        </div>

        <div className="navbar-profile">
          <div className="profile-info">
            <span>Supply Manager</span>
            <div className="profile-avatar">SM</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
