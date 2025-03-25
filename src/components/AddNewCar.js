import React, { useState, useEffect } from 'react';
import './GetAllCars.css';

export default function AddNewCar(props) {
    const [carData, setCarData] = useState({
        brand: "",
        type: "",
        color: "",
        myear: ""
    });

    useEffect(() => {
        if (props.carObj) {
            setCarData({
                brand: props.carObj.brand || '',
                type: props.carObj.type || '',
                color: props.carObj.color || '',
                myear: props.carObj.myear
                    ? new Date(new Date(props.carObj.myear).getTime() - new Date().getTimezoneOffset() * 60000)
                        .toISOString()
                        .split('T')[0]
                    : ''
            });
        } else {
            setCarData({
                brand: "",
                type: "",
                color: "",
                myear: ""
            });
        }
    }, [props.carObj]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = props.carObj && props.carObj.id
            ? `http://localhost:5000/Cars/CarById?id=${props.carObj.id}`
            : `http://localhost:5000/cars`;
        const method = props.carObj && props.carObj.id ? 'PUT' : 'POST';

        const request = await fetch(url, {
            method: method,
            body: JSON.stringify(carData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!request.ok) {
            console.log("Hiba a kérés során");
            return;
        }

       
        props.handleCount();
        props.handleCarObj(null);
    };

    const buttonText = props.carObj ? 'Módosít' : 'Hozzáad';

    return (
        <div className="add-new-car-container">
            <h2>{props.carObj ? 'Autó módosítása' : 'Új autó hozzáadása'}</h2>
            <form onSubmit={handleSubmit} className="car-form">
                <div className="form-group">
                    <label htmlFor="brand">Márka</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={carData.brand}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Autó márkája"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Típus</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={carData.type}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Autó típusa"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Szín</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={carData.color}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Autó színe"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="myear">Gyártási év</label>
                    <input
                        type="date"
                        id="myear"
                        name="myear"
                        value={carData.myear}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Autó gyártási éve-hónap-nap"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-primary">{buttonText}</button>
                </div>
            </form>
        </div>
    );
}