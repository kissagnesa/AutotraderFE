import React, { useState, useEffect, useCallback } from 'react';
import DeleteCar from './DeleteCar';
import AddNewCar from './AddNewCar';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function GetAllCars(props) {
    const url = `http://localhost:5000/cars`;
    const [carsData, setCarsData] = useState([]);
    const [carToUpdate, setCarToUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshCount, setRefreshCount] = useState(0);

    const fetchCars = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const request = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!request.ok) {
                throw new Error(`HTTP error! status: ${request.status}`);
            }
            const response = await request.json();
            setCarsData(response.result);
            console.log(response.message);
        } catch (e) {
            setError(e.message);
            console.error("Error fetching cars:", e);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchCars();
    }, [fetchCars, refreshCount]);

    const handleEditCar = (carFromCard) => {
        setCarToUpdate(carFromCard);
    };

    const handleRefresh = useCallback(() => {
        setRefreshCount(prevCount => prevCount + 1);
        setCarToUpdate(null);
    }, []);

    const carElements = carsData.map((car) => (
        <div
            onDoubleClick={() => handleEditCar(car)}
            className='car-card'
            key={car.id}
        >
            <h3>{car.brand}</h3>
            <p>{car.type}</p>
            <p>Szín: {car.color}</p>
            <p>Gyártási év: {car.myear ? formatDate(car.myear) : 'Nincs adat'}</p>
            <div className="car-actions">
                <DeleteCar carId={car.id} handleCount={handleRefresh} />
            </div>
        </div>
    ));

    return (
        <div className="get-all-cars-container">
            <AddNewCar handleCount={handleRefresh} carObj={carToUpdate} handleCarObj={handleEditCar} />

            {loading && <p>Autók betöltése</p>}
            {error && <p>Hiba a betöltés közben: {error}</p>}
            <div className="car-list">{carElements}</div>
        </div>
    );
}