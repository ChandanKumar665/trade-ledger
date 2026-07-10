import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { routes } from './routes'
import { useAuth } from './hooks/useAuth';
import Login from './components/login/Login';
import Trades from './components/trades/Trades';
import Dashboard from './components/dashboard/Dashboard';
import Accounts from './components/accounts/Accounts';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';



function App() {
  // const { user } = useAuth();
  return (
    <BrowserRouter >
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/trades" element={<Trades />} />
        </Route>
        {/* {
          routes.map((route, i) => <Route key={i} path={route.path} element={route.component} />)
        } */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
