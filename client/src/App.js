import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Notes from './components/Notes';

function App() {
  return (
    // <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}> </Route>
            <Route path="/register" element={<Register/>}> </Route>
            <Route path="/notes" element={<Notes/>} ></Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
