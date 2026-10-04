import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='profile' element={<Profile />} />
          <Route path='home' element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
