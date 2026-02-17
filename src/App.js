import React, { useState, useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import ActiveHike from './components/ActiveHike';
import HikeHistory from './components/HikeHistory';
import AddHike from './components/AddHike';
import HikeDetail from './components/HikeDetail';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [hikes, setHikes] = useState([]);
  const [activeHike, setActiveHike] = useState(null);

  // Load hikes from localStorage on startup
  useEffect(() => {
    const savedHikes = localStorage.getItem('hikes');
    if (savedHikes) {
      setHikes(JSON.parse(savedHikes));
    }
  }, []);

  // Save hikes to localStorage when updated
  useEffect(() => {
    localStorage.setItem('hikes', JSON.stringify(hikes));
  }, [hikes]);

  const startNewHike = () => {
  const now = new Date();
  const newHike = {
    id: Date.now(),
    startTime: now.toISOString(), // This ensures valid ISO format
    endTime: null,
    distance: 0,
    path: [],
    status: 'active',
    paused: false,
    description: '',
    difficulty: 'easy',
    imageUrl: null,
    title: ''
  };
  setActiveHike(newHike);
  setCurrentScreen('active');
};

  const saveCompletedHike = (hikeData) => {
    const completedHike = {
      ...activeHike,
      ...hikeData,
      endTime: new Date().toISOString(),
      status: 'completed'
    };
    setHikes([completedHike, ...hikes]);
    setActiveHike(null);
    setCurrentScreen('home');
  };

  return (
    <div className="App">
      {currentScreen === 'home' && (
        <HomeScreen 
          setCurrentScreen={setCurrentScreen}
          startNewHike={startNewHike}
          hikes={hikes}
        />
      )}
      
      {currentScreen === 'active' && (
        <ActiveHike 
          activeHike={activeHike}
          setActiveHike={setActiveHike}
          saveCompletedHike={saveCompletedHike}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      
      {currentScreen === 'history' && (
        <HikeHistory 
          hikes={hikes}
          setCurrentScreen={setCurrentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      
      {currentScreen === 'add' && (
        <AddHike 
          setCurrentScreen={setCurrentScreen}
          saveCompletedHike={saveCompletedHike}
          activeHike={activeHike}
        />
      )}
      
      {currentScreen === 'detail' && (
        <HikeDetail 
          hike={activeHike}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  );
}

export default App;