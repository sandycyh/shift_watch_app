import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogAShift from './pages/LogAShift';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />    
          <Route path="/LogAShift" element={<LogAShift/>} />      
        </Routes>
      </BrowserRouter >
  )
}

export default App;
