import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tours from './pages/Tours/Tours';
import Tour from './pages/Tour/Tour';
import NewTour from './pages/AddTour/NewTour';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/tours" exact element={<Tours />} />
          <Route path="/tour/:id" exact element={<Tour />} />
          <Route path="/new_tour" exact element={<NewTour/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
