import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile, logout } from "../../services/api-service";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then(setUser)
      .catch(() => navigate("/login"));
  }, []);

  const handleLogout = () => {
    logout().then(() => navigate("/login"));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body text-center"> 
              <h2 className="card-title">User Profile</h2>
              {user ? (
                <>
                  <img 
                    src={user.avatar} 
                    alt="User Avatar" 
                    className="img-fluid rounded-circle mb-3" 
                    style={{ width: "150px", height: "150px", objectFit: "cover" }} 
                  />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
                    <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                  </ul>
                </>
              ) : (
                <p className="text-center text-muted">Loading...</p>
              )}
              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
