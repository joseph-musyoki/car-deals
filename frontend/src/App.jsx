import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider} from "./Context/AuthContext.jsx"
import PrivateRoute from './components/PrivateRoute';
import Login from "./pages/login.jsx";
import Register from "./pages/signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Vehicles from "./pages/vehicle.jsx";
import TestDrives from "./pages/TestDrive.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <PrivateRoute>
                <Vehicles />
              </PrivateRoute>
            }
          />
          <Route
            path="/test-drives"
            element={
              <PrivateRoute>
                <TestDrives />
              </PrivateRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 - Redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;