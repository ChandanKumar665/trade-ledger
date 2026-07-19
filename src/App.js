import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes'
import Login from './components/login/Login';
import Trades from './components/trades/Trades';
import Dashboard from './components/dashboard/Dashboard';
import Accounts from './components/accounts/Accounts';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from './components/404';
import Privacy from './components/Privacy';
import Register from './components/login/Register';
import Profile from './components/profile/Profile';


function App() {
  // const { user } = useAuth();
  return (
    <BrowserRouter >
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {/* {
          routes.map((route, i) => <Route key={i} path={route.path} element={route.component} />)
        } */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
