import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUserFromToken } from '../utils/utils';
import ChildList from './child/ChildList.jsx';
import CheckIn from './checkin/CheckIn.jsx';
import './profile.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkInRefresh, setCheckInRefresh] = useState(0);

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
    return <div className="profile-container">Indhenter information...</div>;
  }


return (
  <div className="profile-page">
  <div className="profile-container">
    <h1>Profil</h1>
    <div className="profile-info">
      <div className="info-section">
        <h2>Dine oplysninger</h2>

        <div className="info-item">
          <label>E-mail:</label>
          <p>{user.email || 'N/A'}</p>
        </div>

        <div className="info-item">
          <label>Navn:</label>
          <p>{user.parentName || 'N/A'}</p>
        </div>
      </div>

      <ChildList
  user={user}
  onCheckout={() =>
    setCheckInRefresh(prev => prev + 1)
  }
/>

<CheckIn
  user={user}
  refresh={checkInRefresh}
/>
    </div>
  </div>
  </div>
);
}
