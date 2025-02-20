
import { useState } from 'react';
import './App.css';
import AddNewCar from './components/AddNewCar';
import GetallCars from './components/GetallCars';


function App()
{

  const [count, setCount] = useState(0)

  const handleCount = () =>{
    setCount(count + 1)
  }
  console.log(count)
  return (
    <div className='container'>
      <AddNewCar handleCount={handleCount} />
      <GetallCars />
    </div>
  )
}


export default App;
