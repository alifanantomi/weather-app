import React from "react";

interface WeatherProps {
    list: WeatherItemModel[]
}

interface WeatherInfo {
    description: string,
    main: string
}

interface WeatherItemModel {
    dt: number,
    main: {
        temp: number,
        feels_like: number,
        name: string,
        humidity: number,
        wind_speed: number;
        visibility: number;
    },
    weather: WeatherInfo[],
    wind: {
        speed: number
    },
    visibility: number
}

export const ListWeather = ({ list }: WeatherProps) => {
    if (!list?.length) {
        return (
            <div>
                <h1>No list found</h1>
            </div>
        )
    }
    return (
        <div>
            {list.map(({ dt, main, weather, wind, visibility }) => {
                return <div className="px-6 py-5 bg-white drop-shadow-lg shadow-black mb-4" key={dt}>
                    <span className="date text-sm">
                        {new Date(dt*1000).toUTCString()}
                    </span>
                    <h1 className="font-semibold mb-2">{}</h1>
                    <div className="flex">
                        <div className="temperatures flex-auto flex flex-col">
                            <span className="temperature text-4xl font-bold mb-4">{main.temp}°</span>
                            <div className="details text-sm font-normal">
                                <div className="feels_like">
                                    <span className="text-gray-500">Feels like</span> {main.feels_like}°
                                </div>
                                <div className="description capitalize">
                                    {weather.map(({description, main}) => (
                                        main + ', ' + description
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="informations flex-auto text-right text-sm">
                            Humidity: {main.humidity} % <br />
                            Wind Speed: {wind.speed} m/s <br />
                            Visibility: {visibility / 1000} km
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListWeather