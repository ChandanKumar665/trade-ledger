import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import "./chartConfig";
import ProtectedLayout from './layout/ProtectedLayout';
import PublicLayout from './layout/PublicLayout';
import { common, protectedRoutes, publicRoutes, underConstruction } from './routes';

function App() {
  let pubRoutes, dashboardRoutes = [];
  if (process.env.REACT_APP_ENV === 'dev') {
    pubRoutes = [...publicRoutes, ...common];
    dashboardRoutes = [...protectedRoutes, ...common];
  } else {
    pubRoutes = [...underConstruction];
    dashboardRoutes = [...underConstruction];
  }
  return (
    <BrowserRouter >
      <Routes>
        {/* Public Routes */}
        <Route
          element={
            <PublicRoute>
              <PublicLayout />
            </PublicRoute>
          }
        >
          {
            pubRoutes.map(route => <Route path={route.path} element={route.component} />)
          }
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          {
            dashboardRoutes.map(route => <Route path={route.path} element={route.component} />)
          }
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
