import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes'
import { useAuth } from './hooks/useAuth';


function App() {
  // const { user } = useAuth();
  return (
    <BrowserRouter >
      <Routes>
        {
          routes.map((route, i) => <Route key={i} path={route.path} element={route.component} />)
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
