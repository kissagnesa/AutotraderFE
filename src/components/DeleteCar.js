import React from "react";
import './GetAllCars.css';

export default function DeleteCar(props) {
    const handleCarId = async () => {
        const url = `http://localhost:5000/Cars/CarById?id=${props.carId}`;

        const request = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!request.ok) {
            console.log("Hiba a törlés során");
            return;
        }

        const response = await request.json();
        props.handleCount();
        console.log(response.message);
    };

    return (
        <button className='delete-button' onClick={handleCarId}>Töröl</button>
    );
}