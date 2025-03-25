// App.js
import React, { useState } from 'react';
import './App.css';
import GetAllCars from './components/GetallCars';

function App() {
  const [refreshCars, setRefreshCars] = useState(false);

  const handleCarAdded = () => {
    setRefreshCars(!refreshCars); 
  };

  const handleCarDeleted = () => {
    setRefreshCars(!refreshCars); 
  };

  const handleCarUpdated = () => {
    setRefreshCars(!refreshCars); 
  };

  return (
    <div className="container">
      <GetAllCars
        refresh={refreshCars}
        onCarAdded={handleCarAdded}
        onCarDeleted={handleCarDeleted}
        onCarUpdated={handleCarUpdated}
      />
    </div>
  );
}

export default App;