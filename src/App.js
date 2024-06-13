import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserManagement from "./Pages/UserManagement";
import AdminDashboard from "./Pages/AdminDashboard";
import BusinessListing from "./Pages/BusinessListing";
import ProblemReports from "./Pages/ProblemReports";
import ReportDetail from "./Pages/ReportDetail";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import NotificationDetail from "./Pages/NotificationDetail";
import Login from "./Pages/Login";
import AuthProvider  from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<PrivateRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/UserManagement"
            element={<PrivateRoute element={<UserManagement />} />}
          />
          <Route
            path="/BusinessListing"
            element={<PrivateRoute element={<BusinessListing />} />}
          />
          <Route
            path="/ProblemReports"
            element={<PrivateRoute element={<ProblemReports />} />}
          />
          <Route
            path="/ReportDetail/:id"
            element={<PrivateRoute element={<ReportDetail />} />}
          />
          <Route
            path="/Notifications"
            element={<PrivateRoute element={<Notifications />} />}
          />
          <Route
            path="/notifications/:id"
            element={<PrivateRoute element={<NotificationDetail />} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute element={<Settings />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
