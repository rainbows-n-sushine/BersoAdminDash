import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './Pages/UserManagement';
import AdminDashboard from './Pages/AdminDashboard';
import BusinessListing from './Pages/BusinessListing';
import ProblemReports from './Pages/ProblemReports';
import ReportDetail from './Pages/ReportDetail';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';
import NotificationDetail from './Pages/NotificationDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/BusinessListing" element={<BusinessListing />} />
        <Route path="/ProblemReports" element={<ProblemReports />} />
        <Route path="/ReportDetail/:id" element={<ReportDetail />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/notifications/:id" element={<NotificationDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById('root'));