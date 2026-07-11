import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LogAShift from './pages/LogAShift';
import Navbar from './Components/NavBar';
import Drawer from './Components/Drawer';


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onMenu={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main style={{ paddingTop: 64 }} >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/LogAShift" element={<LogAShift />} />
        </Routes>
      </main>
    </BrowserRouter >
  )
}

export default App;
