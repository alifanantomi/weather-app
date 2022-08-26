import React from "react";

interface CurrentWeatherModel {
    dt: number;
    temp: number;
    feels_like: number;
    name: string,
    humidity: number,
    description: string;
    wind_speed: number;
    visibility: number;
    main: string,
    lang: number,
    long: number
}

export const DisplayWeather = ({dt, temp, feels_like, name, humidity, description, wind_speed, visibility, main}: CurrentWeatherModel) => {
    return (
        <div className="px-6 py-5 bg-white drop-shadow-lg shadow-black mb-8">
            <span className="date text-sm">
                {
                    new Date(dt*1000).toUTCString()
                }
            </span>
            <h1 className="font-semibold mb-2">{name}</h1>
            <div className="flex">
                <div className="temperatures flex-auto flex flex-col">
                    <span className="temperature text-4xl font-bold mb-4">{temp}°</span>
                    <div className="details text-sm font-normal">
                        <div className="feels_like">
                            <span className="text-gray-500">Feels like</span> {feels_like}°
                        </div>
                        <div className="description capitalize">{main + ', ' +description}</div>
                    </div>
                </div>
                <div className="informations flex-auto text-right text-sm">
                    Humidity: {humidity} % <br />
                    Wind Speed: {wind_speed} m/s <br />
                    Visibility: {visibility} km
                </div>
            </div>
        </div>
    )
}

export default DisplayWeather