import React, { useEffect, useState } from 'react';
import DisplayWeather from './components/DisplayWeather';
import { ListWeather } from './components/ListWeather';
import { SearchBox } from './components/SearchBox';

function App() {

  const apiBaseUrl = process.env.REACT_APP_BASE_URL
  const apiGeoBaseUrl = process.env.REACT_APP_GEO_BASE_URL

  const apiKey = process.env.REACT_APP_API_KEY

  const [status, setStatus] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>([]);
  const [nextDayWeather, setNextDayWeather] = useState<any>([]);
  const [searchLocations, setSearchLocations] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<any>();
  
  const getCurrentWeather = (lat: number, lon: number) =>  {

    fetch(`${apiBaseUrl}weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setWeather(data)
    })
  }

  const getNextDayWeather = (lat: number, lon: number) => {
    fetch(`${apiBaseUrl}forecast?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setNextWeather(data)
    })
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);

        getCurrentWeather(position.coords.latitude, position.coords.longitude)
        getNextDayWeather(position.coords.latitude, position.coords.longitude)

      }, () => {
        console.log("Please enable access location in the browser");
        setStatus("Please enable access location in the browser")
      });
    }else {
      setStatus("Geolocation not available")
    }
  }

  const searchLocationsByCityName = (name: string | undefined) => {
    
    fetch(`${apiGeoBaseUrl}direct?q=${name}&limit=1&appid=${apiKey}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      setLocations(data)
      
      return searchWeatherByLocations(data[0].lat, data[0].lon)
    })
  }

  const searchWeatherByLocations = (lat: number, lon: number) => {
    getCurrentWeather(lat, lon)
    getNextDayWeather(lat, lon)
  }

  useEffect(() => {
    getCurrentLocation()

    // searchLocationsByCityName('Bandung')
    
  }, [])

  const setWeather = (data: any) => {
    setCurrentWeather({
      dt: data.dt,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      name: data.name,
      rain: 0,
      visibility: data.visibility / 1000,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      main: data.weather[0].main,
    })
  }

  const setNextWeather = (data: any) => {
    setNextDayWeather({
      name: data.city.name,
      list: data.list
    })
  }

  const setLocations = (data: any) => {
    setSearchLocations({
      name: data[0].name,
      lat: data[0].lat,
      lon: data[0].lon,
    })
  }

  const setQuery = (data: any) => {
    setSearchQuery({
      name: data.city.name,
      list: data.list
    })
  }

  return (
    <div className='p-10 bg-slate-300'>
      <div className="w-1/2 container mx-auto justify-center">
        <SearchBox onSubmitSearch={searchLocationsByCityName} />

        {status && 
          <div className="px-6 py-5 bg-white drop-shadow-lg shadow-black font-semibold mb-4">
            {status}
          </div> 
        }

        <h1 className="text-3xl mb-4">Today</h1>

        <DisplayWeather {...currentWeather} />

        <h1 className="text-3xl mb-4">Next 5 day / 3 hour forecast</h1>

        <ListWeather {...nextDayWeather} />
      </div>
    </div>
  );
}

export default App;
 