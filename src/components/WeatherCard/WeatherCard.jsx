function WeatherCard({ query }) {
	const weather = query.weather;

	return (
		<div className="weather__card relative w-96 overflow-hidden bg-white py-4 px-6 shadow-lg rounded-lg">
			<div className="weather__card__icon absolute top-2 right-2 z-0">
				<img src={weather.current.condition.icon} />
			</div>

			<div className="weather__card__header mb-2">
				<h2 className="weather__card__header__city text-left text-sm text-gray-400 uppercase font-bold">
					{weather.location.name}
				</h2>
			</div>

			<div className="weather__card__body">
				<div className="weather__card__body__temp mb-1">
					<span className="weather__card__body__temp__value text-4xl text-gray-700 font-bold">
						{Math.round(weather.current.temp_c)} °C
					</span>
				</div>

				<div className="weather__card__body__text">
					<span className="weather__card__body__text__value text-sm text-gray-400">
						Feels like: {Math.round(weather.current.feelslike_c)} °C
					</span>
				</div>
			</div>

			<div className="w-full h-px bg-gray-300 my-4"></div>

			<div className="weather__card__info grid grid-cols-2 gap-4">
				<div className="weather__card__info__item flex flex-col">
					<span className="weather__card__info__item__title text-lg text-gray-700 font-semibold mb-1">Wind</span>

					<span className="weather__card__info__item__value text-sm text-gray-500">
						Speed: {Math.round(weather.current.wind_kph)} km/h
					</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">
						Degree: {weather.current.wind_degree}°
					</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">
						Direction: {weather.current.wind_dir}
					</span>
				</div>

				<div className="weather__card__info__item flex flex-col">
					<span className="weather__card__info__item__title text-lg text-gray-700 font-semibold mb-1">Other</span>

					<span className="weather__card__info__item__value text-sm text-gray-500">
						Humidity: {weather.current.humidity}
					</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">UV: {weather.current.uv}</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">
						Pressure: {weather.current.pressure_mb}
					</span>
				</div>
			</div>
		</div>
	);
}

export default WeatherCard;
