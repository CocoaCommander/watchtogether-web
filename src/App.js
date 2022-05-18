import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home';

function App() {
  const [isHost, setIsHost] = useState(false);
  const [socketURL, setSocketURL] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <Routes>
        <Route path='/' element={Home}/>
        <Route path='/:roomid'/>
      </Routes>
    </>
  );
}

export default App;
