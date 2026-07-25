import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import "./chartConfig";
import { common, protectedRoutes, publicRoutes } from './routes';

function App() {
  // const { user } = useAuth();
  return (
    <BrowserRouter >
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          {
            [...publicRoutes, ...common].map(route => <Route path={route.path} element={route.component} />)
          }
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {
            [...protectedRoutes, ...common].map(route => <Route path={route.path} element={route.component} />)
          }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
