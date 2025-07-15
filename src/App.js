import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/components/Home';
import EventSelector from "./components/EventSelector";
import NewEventForm from "./components/NewEventForm";
import EventDetails from "./components/EventDetails";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/EventSelector" element={<EventSelector />} />
          <Route path="/NewEventForm" element={<NewEventForm />} />
          <Route path="/EventDetails" element={<EventDetails />} />


        </Routes>
      </Router>
  );
}

export default App;
