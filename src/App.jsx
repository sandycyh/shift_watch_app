import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Navbar from './Components/NavBar';
import Drawer from './Components/Drawer';
import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onMenu={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </BrowserRouter >
  )
}

export default App;
