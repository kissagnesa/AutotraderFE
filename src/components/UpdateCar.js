import React from 'react'

function UpdateCar(props)
{
    const handleCarData = async (event) =>
    {
        const url = `https://localhost:7118/cars?id=${props.carData.id}`

        const request = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(props.carData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!request.ok)
        {
            console.log("Hiba")
            return
        }

        var response = await request.json()
        console.log(response.message)
        props.handleCount()
}
    console.log(props.carData)
    
    return (
        <button onClick={handleCarData} type='button' className='btn btn-primary'>Módosít</button>
    )
}



export default UpdateCar