/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useEffect, useState } from "react";
import {
  BsCloudLightningFill,
  BsCloudRainHeavyFill,
  BsCloudsFill,
  BsFillCloudDrizzleFill,
  BsSnow,
  BsSunFill,
} from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { WiWindy } from 'react-icons/wi'

const Weather = () => {
  const [initial, setInitial] = useState(true)
  const [weatherData, setWeatherData] = useState<any | null>(null)
  const [temperatureColor, setTemperatureColor] = useState<string>('')
  const [temperatureText, setTemperatureText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=-7.2492&lon=112.7508&units=metric&appid=1ddf5eb0a8599080434ff7da39c18fa4`
          )
        const data = await response.json()
        if (response.ok) {
          setInitial(false)
          setIsLoading(false)
          setWeatherData(data)
          
        } else {
          console.error('Failed to fetch weather data')
        }
      } catch (error) {
        console.error('Failed to fetch weather data')
      }
    }
    if (initial) {
      getWeatherData()
    }
  },[initial])

  useEffect(() => {
    const setTemperatureTextColor = (temp: number) => {
      if (temp <= 0) {
        setTemperatureColor('#0000FF')
        setTemperatureText('Freezing')
      } else if (temp <= 10) {
        setTemperatureColor('#00BFFF')
        setTemperatureText('Cool')
      } else if (temp <= 25) {
        setTemperatureColor('#E3B202')
        setTemperatureText('Moderate')
      } else if (temp <= 35) {
        setTemperatureColor('#FFA500')
        setTemperatureText('Warm')
      } else {
        setTemperatureColor('#FF0000')
        setTemperatureText('Hot')
      }
    }

    if (weatherData && weatherData.main) {
      const temperature = Math.round(weatherData.main.temp)
      setTemperatureTextColor(temperature)
    }
  }, [weatherData])

  const iconHandler = (weather: string) => {
    if (weather === 'Clouds')
      return <BsCloudsFill className='h-16 w-16 text-blue-400' />
    else if (weather === 'Rain')
      return <BsCloudRainHeavyFill className='h-16 w-16 text-blue-500' />
    else if (weather === 'Thunderstorm')
      return <BsCloudLightningFill className='h-16 w-16 text-yellow-500' />
    else if (
      weather === 'Mist' ||
      weather === 'Smoke' ||
      weather === 'Haze' ||
      weather === 'Dust' ||
      weather === 'Fog' ||
      weather === 'Sand' ||
      weather === 'Dust' ||
      weather === 'Ash' ||
      weather === 'Squall' ||
      weather === 'Tornado'
    )
      return <WiWindy className='h-16 w-16 text-gray-500' />
    else if (weather === 'Drizzle')
      return <BsFillCloudDrizzleFill className='h-16 w-16 text-gray-300' />
    else if (weather === 'Clear')
      return <BsSunFill className='h-16 w-16 text-yellow-500' />
    else if (weather === 'Snow')
      return <BsSnow className='h-16 w-16 text-blue-400' />
  }

  const convertWindDirection = (degrees: number) => {
    const directions = [
      'North',
      'Northeast',
      'East',
      'SouthEast',
      'South',
      'Southwest',
      'West',
      'Northwest',
    ]
    const index = Math.round((degrees % 360) / 45)
    return directions[index]
  }

  return (
    <div className="h-screen w-screen content-center items-center text-center">
      <div className="pt-8 text-2xl font-medium">
        Weather Data
      </div>
      <div className='py-10'>
        {isLoading && (
          <span>
            Loading weather data. Please wait ....
          </span>
        )}
      <div className='flex h-full flex-col items-center'>
        {
          !isLoading && (
            <div>
              <div className='text-center text-lg font-bold'>
            <div className='flex flex-row items-center justify-center gap-2 pb-8'>
              <FaMapMarkerAlt className='text-red-500' />
              {weatherData.name}, Indonesia
            </div>
          </div>

          <div className='flex h-full gap-8'>
            <div className='flex flex-col justify-center gap-0 text-center'>
              <div className='flex justify-center'>
                {iconHandler(weatherData.weather[0].main)}
              </div>
              <p className='pt-2 font-bold'>{weatherData.weather[0].main}</p>
            </div>

            <div className='flex h-full flex-col items-center justify-center gap-0 text-center'>
              <p className='mb-1 text-gray-600'>Temp</p>
              <h3 className='text-5xl tracking-tight'>
                {Math.round(weatherData.main.temp)}°C
              </h3>
              <span
                className='mt-1 rounded-full px-5 py-1 text-center font-bold'
                style={{
                  backgroundColor: temperatureColor,
                  color: 'white',
                  fontSize: '15px',
                }}
              >
                {temperatureText}
              </span>
            </div>

            <div className='flex h-full flex-col justify-center gap-2 text-center'>
              <div className='mb-2 flex flex-col justify-center gap-0 text-center'>
                <p className='text-gray-600'>Wind Speed</p>
                <p className='font-bold'>{weatherData.wind.speed}m/s</p>
              </div>
              <div className='flex flex-col justify-center gap-0 text-center'>
                <p className='text-gray-600'>Humidity</p>
                <p className='font-bold'>{weatherData.main.humidity}%</p>
              </div>
            </div>

            <div className='flex h-full flex-col justify-center gap-2 text-center'>
              <div className='mb-2 flex flex-col justify-center gap-0 text-center'>
                <p className='text-gray-600'>Wind Direction</p>
                <p className='font-bold'>
                  {convertWindDirection(weatherData.wind.deg)}
                </p>
              </div>
              <div className='flex flex-col justify-center gap-0 text-center'>
                <p className='text-gray-600'>Visibility</p>
                <p className='font-bold'>{weatherData.visibility / 1000}km</p>
              </div>
            </div>
          </div>
            </div>
          )
        }
          
        </div>
      </div>
    </div>
  );
};

export default Weather;
