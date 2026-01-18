import './App.css';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import Calendar from "./components/calendar_components/Calendar.jsx"
import Day from "./components/day_components/Day.jsx"
import EditDay from "./components/day_components/EditDay.jsx"
import Home from "./components/general_components/Home.jsx"
import EmptyView from "./components/general_components/EmptyView.jsx"
import Header from "./components/general_components/Header.jsx"

function AppContent() {
  const navigate = useNavigate();

  const getDateInfo = () => {
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    const monthIndex = currentDate.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return {
        currentYear: currentDate.getFullYear(),
        currentMonth: months[monthIndex],
        dayNumber: currentDate.getDate(),
        currentDay: daysOfTheWeek[dayIndex]
    };
};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.code === 'KeyH') {
        navigate('/');
        e.preventDefault();
      }
      if (e.ctrlKey && e.code === 'KeyC') {
        navigate(`/calendar/2026/${getDateInfo().currentMonth}`);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<EmptyView/>} />
        <Route exact path="/calendar/:year/:month" element={<Calendar/>} />
        <Route exact path="/calendar/days/:year/:month/:day" element= { <Day/>}/>
        <Route exact path="/calendar/days/:year/:month/:day/edit" element= { <EditDay/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
