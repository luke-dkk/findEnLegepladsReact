import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUserFromToken } from '../utils/utils';
import ChildList from './child/ChildList.jsx';
import './profile.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const userData = await getUserFromToken();
      console.log('User data from token:', userData);
      if (!mounted) return;
      if (!userData) {
        navigate('/auth/login');
        return;
      }
      setUser(userData);
      setLoading(false);
    }

    load();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }


return (
  <div className="profile-container">
    <h1>Profile</h1>

    <div className="profile-info">

      {/* USER INFO */}
      <div className="info-section">
        <h2>User Information</h2>

        <div className="info-item">
          <label>Email:</label>
          <p>{user.email || 'N/A'}</p>
        </div>

        <div className="info-item">
          <label>User ID:</label>
          <p>{user.id || 'N/A'}</p>
        </div>
      </div>

      {/* CHILDREN */}
      <ChildList user={user} />

    </div>
  </div>
);
}
