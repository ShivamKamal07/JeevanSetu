import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
};

  return (
    <header className="shadow-sm">    
    
 
      <nav className="navbar navbar-expand-lg navbar-light  fixed-top py-3 px-4 shadow" style={{  backgroundColor: "#ffffff"  }}>
        <div className="container-fluid">

           
          <Link className="navbar-brand" to="/">
  <img src={logo} alt="logo" height="40" />
</Link>

         
      
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-3">

            
              <li className="nav-item">
                <Link className="nav-link fw-bold text-dark" to="/">Home</Link>
              </li>

             
              {!token && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-dark" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-dark" to="/signup">Signup</Link>
                  </li>
                </>
              )}

          
              {token && role === "patient" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-dark" to="/patient">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                            <button className="btn btn-danger" onClick={logout}>
                      Logout
                </button>
                  </li>
                </>
              )}

            
              {token && role === "doctor" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-dark" to="/doctor">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
              )}

              {/* Search
              <li className="nav-item ms-lg-3">
                <form className="d-flex position-relative">
                  <input 
                    className="form-control rounded-pill bg-light border-0 ps-3 pe-5" 
                    type="search" 
                    placeholder="Search..." 
                  />
                  <span className="position-absolute end-0 top-50 translate-middle-y pe-3 text-muted">
                    🔍
                  </span>
                </form>
              </li> */}

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
