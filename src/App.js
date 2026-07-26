import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import "./chartConfig";
import ProtectedLayout from './layout/ProtectedLayout';
import PublicLayout from './layout/PublicLayout';
import { common, protectedRoutes, publicRoutes } from './routes';

function App() {
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
            [...publicRoutes, ...common].map(route => <Route path={route.path} element={route.component} />)
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
            [...protectedRoutes, ...common].map(route => <Route path={route.path} element={route.component} />)
          }
        </Route>
        {/* {
          routes.map((route, i) => <Route key={i} path={route.path} element={route.component} />)
        } */}
      </Routes>
    </BrowserRouter >
  );
}

export default App;
