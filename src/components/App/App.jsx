import { useState, useEffect } from "react";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import WeatherCardSkeleton from "@/components/WeatherCard/WeatherCardSkeleton";

import fetchSearch from "@/api/fetchSearch";
import fetchWeather from "@/api/fetchWeather";

function App() {
	const [weather, setWeather] = useState({});
	const [loadingWeather, setLoadingWeather] = useState(true);

	const [searchCity, setSearchCity] = useState({ name: "" });

	const [searchList, setSearchList] = useState([]);
	const [loadingSearch, setLoadingSearch] = useState(false);

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		setLoadingSearch(true);

		fetchSearch(searchCity.name).then((data) => {
			setSearchList(data.searchData);
			setLoadingSearch(data.loading);
		});
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
			setLoadingWeather(data.loading);
		});
	};

	return (
		<div className="weather__app w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-gray-200">
			<form className="w-96 mb-4 flex flex-col items-center justify-center" onSubmit={handleSearchSubmit}>
				<div className="w-full relative">
					<label className="w-full relative" htmlFor="searchCity">
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

						{loadingSearch ? (
							<div className="absolute top-1/2 right-0 -translate-y-1/2" role="status">
								<svg
									aria-hidden="true"
									class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
								<span class="sr-only">Loading...</span>
							</div>
						) : null}
					</label>

					{searchList.length > 0 ? (
						<div className="absolute mt-1 w-full top-full overflow-hidden max-h-64 overflow-y-auto left-0 rounded-md bg-white shadow-xl z-10">
							{searchList.map((city) => (
								<div
									className="py-2 px-4 text-gray-700 cursor-pointer hover:bg-blue-50"
									data-city-lat={city.lat}
									data-city-lon={city.lon}
									data-city-name={city.name}
									onClick={handleSearchClick}
									key={city.id}
								>
									<p className="pointer-events-none mb-1 leading-none">{city.name}</p>
									<p className="pointer-events-none text-sm text-gray-400 leading-none">{city.country}</p>
								</div>
							))}
						</div>
					) : null}
				</div>
			</form>

			{loadingWeather ? (
				<WeatherCardSkeleton></WeatherCardSkeleton>
			) : (
				<div>
					<WeatherCard query={{ weather }}></WeatherCard>
				</div>
			)}

			<div className="absolute bottom-6 right-6 text-sm font-semibold text-gray-400">
				<p className="text-right">
					Designed and coded by <span className="underline">Eduard &lt;Deeckoy&gt; Gausater</span>
				</p>

				<div className="flex justify-end gap-4 mt-2">
					<a className="text-blue-400 hover:text-blue-500" target="_blank" href="https://github.com/Deeckoy">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 256 250">
							<path
								fill="#161614"
								d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403Z"
							/>
						</svg>
					</a>

					<a
						className="text-blue-400 hover:text-blue-500"
						target="_blank"
						href="https://www.linkedin.com/in/edward-haussauer/"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 256 256">
							<path
								fill="#0A66C2"
								d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009c-.002-12.157 9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
							/>
						</svg>
					</a>

					<a className="text-blue-400 hover:text-blue-500" target="_blank" href="https://t.me/edhauss">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 256 256">
							<defs>
								<linearGradient id="logosTelegram0" x1="50%" x2="50%" y1="0%" y2="100%">
									<stop offset="0%" stop-color="#2AABEE" />
									<stop offset="100%" stop-color="#229ED9" />
								</linearGradient>
							</defs>
							<path
								fill="url(#logosTelegram0)"
								d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
							/>
							<path
								fill="#FFF"
								d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
