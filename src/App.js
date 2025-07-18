import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import EventSelector from "./components/EventSelector";
import NewEventForm from "./components/NewEventForm";
import EventDetails from "./components/EventDetails";
import ParticipantCard from "./components/ParticipantCard";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/EventSelector" element={<EventSelector />} />
          <Route path="/NewEventForm" element={<NewEventForm />} />
            <Route path="/EventDetails" element={<EventDetails />} />
            {/*<Route path="*" element={<HomePage />} />*/}
            {/*<Route path="/EventDetails/:id" element={<EventDetails />} />*/}
            <Route path="/ParticipantCard" element={<ParticipantCard />} />


        </Routes>
      </Router>
  );
}

export default App;
