import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Verification from './pages/Verification/Verification';
import ControlPanelUser from './pages/Control panel/ControlPanelUser';
import ControlPanelAdmin from './pages/Control panel/ControlPanelAdmin';
import ControlPanelDriver from './pages/Control panel/ControlPanelDriver';
import PreviousTrips from './pages/Previous trips/PreviousTrips';
import AllTrips from './pages/All trips/AllTrips';
import MyTrips from './pages/My trips/MyTrips';
import { gapi } from 'gapi-script';

const App: React.FC = () => {

  const clientId = '781999004701-75nidrkkr11fc3jru4j98o65u7t9gp9j.apps.googleusercontent.com';

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/dashboard-user" element={<ControlPanelUser />} />
        <Route path="/dashboard-admin" element={<ControlPanelAdmin />} />
        <Route path="/dashboard-driver" element={<ControlPanelDriver />} />
        <Route path="/previous-trips" element={<PreviousTrips />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/all-trips" element={<AllTrips />} />
      </Routes>
    </Router>
  );
}

export default App;