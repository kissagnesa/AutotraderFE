import { useState } from 'react';
import './App.css';
import AddNewCar from './components/AddNewCar';


function App()
{
  const [count, setCount] = useState(0)

  const handleCount = () =>
  {
    setCount(count + 1)
  }

  console.log(count)

  return (
    <div className='container'>
      <GetallCars count={count} handleCount={handleCount}/>
    </div>
  )
}


export default App;