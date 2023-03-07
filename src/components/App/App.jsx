import { useState, useEffect } from "react";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import WeatherCardSkeleton from "@/components/WeatherCard/WeatherCardSkeleton";

import fetchSearch from "@/api/fetchSearch";
import fetchWeather from "@/api/fetchWeather";

function App() {
	const [weather, setWeather] = useState({});
	const [searchCity, setSearchCity] = useState({ name: "" });
	const [searchList, setSearchList] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		fetchSearch(searchCity.name).then((data) => setSearchList(data));
	};

	const handleSearchInput = (event) => {
		event.preventDefault();
		setSearchCity({ name: event.target.value });
	};

	const handleSearchClick = (event) => {
		event.preventDefault();

		setSearchList([]);
		setSearchCity({
			name: event.target.dataset.cityName,
			lat: event.target.dataset.cityLat,
			lon: event.target.dataset.cityLon,
		});

		fetchWeather(`${event.target.dataset.cityLat}, ${event.target.dataset.cityLon}`).then((data) => {
			setWeather(data.weatherData);
			setLoading(data.loading);
		});
	};

	return (
		<div className="weather__app w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-gray-200">
			<form className="w-96 mb-4 flex flex-col items-center justify-center" onSubmit={handleSearchSubmit}>
				<label className="relative w-full" htmlFor="searchCity">
					<input
						className="rounded-md shadow-lg px-4 py-2 outline-none w-full"
						type="text"
						name="searchCity"
						id="searchCity"
						placeholder="Find your place"
						autoComplete="off"
						value={searchCity.name}
						onInput={handleSearchInput}
					/>

					{searchList.length > 0 ? (
						<div className="absolute mt-1 w-full top-full overflow-hidden max-h-64 overflow-y-auto left-0 rounded-md bg-white shadow-xl z-10">
							{searchList.map((city) => (
								<div
									className="p-2 text-gray-700 cursor-pointer hover:bg-blue-50"
									data-city-lat={city.lat}
									data-city-lon={city.lon}
									data-city-name={city.name}
									onClick={handleSearchClick}
									key={city.id}
								>
									<p className="pointer-events-none">{city.name}</p>
									<p className="pointer-events-none">{city.country}</p>
								</div>
							))}
						</div>
					) : null}
				</label>
			</form>

			{loading ? (
				<WeatherCardSkeleton></WeatherCardSkeleton>
			) : (
				<div>
					<WeatherCard query={{ weather }}></WeatherCard>
				</div>
			)}
		</div>
	);
}

export default App;
