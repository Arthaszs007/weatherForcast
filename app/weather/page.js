"use client"; // This directive indicates that we're using this file in a client-side environment.

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../auth-context"; // Adjust the path as needed
import Link from "next/link";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const { user } = useUserAuth(); // Assume no need for firebaseSignOut directly here unless a logout feature on this page is desired
  

  // TODO: Implement fetchWeather function to fetch weather data using the OpenWeatherMap API.
  const fetchWeather = async()=>{
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=calgary&appid=4d8f791147d259b735c60e8f312e4251&units=metric`)
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
   
     
      const data = await response.json()
      
      // Handle weather data here
      setWeather(data);
      

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  // Read the documentation of the API provider to understand how to handle the returned JSON object.

  // TODO: Implement loadWeather function that calls fetchWeather and sets the returned data into the weather state.

  useEffect(() => {
    if(user){
     fetchWeather();
    }
    // TODO: Check if the user is logged in. If yes, call loadWeather to fetch weather data.
  }, [user,weather]); // Dependency array ensures this effect runs when the user state changes.


  const currentDate = new Date();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-blue-100">
      <h1 className="text-2xl font-bold mb-4 text-red-800">
        Weather in calgary
      </h1>
      {user ? (
        <>
          {/* TODO: Display the weather information if available. Include temperature and weather condition. */}
          {
            weather?(
            <>
              <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src="https://leapassets.s3.ap-south-1.amazonaws.com/Southern_Alberta_Institute_Of_Technology_6e6454d443.png" alt="Album"/></figure>
                <div className="card-body">
                  <h2 className="card-title bg-accent">{currentDate.getFullYear()}/{currentDate.getMonth() + 1}/{currentDate.getDate()}</h2>
                  <p>Temperature: {weather.main.temp}°C</p>
                  <p>Feels Like: {weather.main.feels_like}°C</p>
                  <p>Weather: {weather.weather[0].description}</p>
                  <p>WindSpeed: {weather.wind.speed}</p>
                  <p>humidity: {weather.main.humidity}%</p>
                  <div className="card-actions justify-end">
                  <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    {/* TODO: If needed, provide a Logout button here or ensure there's a way to navigate back or log out. */}
                    <Link href="/">Home</Link>
                  </button>
                  </div>
                </div>
              </div>

            </>
            ):(console.log("null"))
          }



          {/* Optional: Display additional weather details as needed. */}
          {/* <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            
            <Link href="/">Home</Link>
          </button> */}
        </>
      ) : (
        <>
          <p>Please log in to see the weather information.</p>
          <Link href="/">
            <a className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Home
            </a>
          </Link>
        </>
      )}
    </main>
  );
}
