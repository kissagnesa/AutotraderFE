import React, { useEffect, useState } from 'react'
import DeleteCar from './DeleteCar'
import AddNewCar from './AddNewCar'

function GetallCars(props)
{
    const url = `https://localhost:7118/cars`
    const [carsData, setCarsData] = useState([])
    const [carObj, setCarObj] = useState(null)


    useEffect(() =>
    {
        (async () =>
        {
            const request = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!request.ok)
            {
                console.log("Hiba")
                return
            }

            const response = await request.json();
            setCarsData(response.result)
            console.log(response.message)
        })()
    }, [props.count])

    const handleCarObj = (carFromCard) =>
    {
        setCarObj(carFromCard)
    }

    const carElments = carsData.map(
        car =>
        {
            return (
                <div onDoubleClick={()=>{handleCarObj(car)}} className="card m-3 pt-2" style={{ 'width': 200, 'float': 'left' }} key={car.id}>
                    <div className="card-header">{car.brand}</div>
                    <div className="card-body">{car.type}</div>
                    <div className="card-footer">{car.color}</div>
                    <div className="card-footer">{car.myear}</div>
                    <div><DeleteCar carId={car.id} handleCount={props.handleCount}/></div>
                </div>
            )
        }
    )

    return (
        <> 
        <AddNewCar handleCount={props.handleCount}/>
        <div>{carElments}</div>
        </> //ha több elemet akarunk betenni, akkor kell egy üres tag, mert anélkül visít a react
    )
}

export default GetallCars