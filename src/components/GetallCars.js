import React, { useEffect, useState } from 'react'

function GetallCars()
{
    const url = `https://localhost:7118/cars`
    const [carsData, setCarsData] = useState([])

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
    }, [carsData])

    const carElments = carsData.map(
        car =>
        {
            return (
                <div class="card m-3 pt-2"style={{ 'width': 200, 'float': 'left' }}>
                    <div class="card-header">{car.brand}</div>
                    <div class="card-body">{car.type}</div>
                    <div class="card-footer">{car.color}</div>
                    <div class="card-footer">{car.myear}</div>
                </div>
            )
        }
    )

    return (
        <div>{carElments}</div>
    )
}

export default GetallCars