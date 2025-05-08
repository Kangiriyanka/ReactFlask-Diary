
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Calendar from "./components/calendar_components/Calendar.jsx"
import Day from "./components/day_components/Day.jsx"
import EditDay from "./components/day_components/EditDay.jsx"
import Home from "./components/general_components/Home.jsx"
import EmptyView from "./components/general_components/EmptyView.jsx"

function App() {






  
  return (
    <div className="App">
    
    <BrowserRouter>
    <Routes>

    <Route exact path="/" element={<Home />} />
    <Route exact path="/404" element={<EmptyView/>} />
    <Route exact path="/calendar/:year/:month" element={<Calendar/>} />
    <Route exact path="/calendar/days/:year/:month/:day" element= { <Day/>}/>
    <Route exact path="/calendar/days/:year/:month/:day/edit" element= { <EditDay/>}/>


      
    </Routes>
    
    </BrowserRouter>
      
    </div>
  );
}

export default App;
