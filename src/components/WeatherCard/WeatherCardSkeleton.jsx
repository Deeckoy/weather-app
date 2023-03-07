function WeatherCardSkeleton() {
	return (
		<div className="weather__card w-96 bg-white py-4 px-6 shadow-lg rounded-lg">
			<div className="weather__card__header mb-2">
				<h2 className="weather__card__header__city text-left text-sm text-gray-400 uppercase font-bold">
					<div className="animate-pulse h-5 bg-gray-200 rounded-4 w-24 mb-4"></div>
				</h2>
			</div>

			<div className="weather__card__body">
				<div className="weather__card__body__temp mb-1">
					<div className="weather__card__body__temp__value text-4xl text-gray-700 font-bold">
						<span className="animate-pulse inline-block h-8 mr-3 bg-gray-200 rounded-4 w-32"></span>
						°C
					</div>
				</div>

				<div className="weather__card__body__text">
					<span className="weather__card__body__text__value text-sm text-gray-400">
						Feels like: <span className="animate-pulse inline-block h-3 bg-gray-200 rounded-4 w-12"></span> °C
					</span>
				</div>
			</div>

			<div className="w-full h-px bg-gray-300 my-4"></div>

			<div className="weather__card__info grid grid-cols-2 gap-4">
				<div className="weather__card__info__item flex flex-col">
					<span className="weather__card__info__item__title text-lg text-gray-700 font-semibold mb-1">Wind</span>

					<span className="weather__card__info__item__value text-sm text-gray-500">
						Speed: <span className="animate-pulse inline-block h-3 bg-gray-200 rounded-4 w-12"></span> km/h
					</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">
						Degree: <span className="animate-pulse inline-block h-3 bg-gray-200 rounded-4 w-12"></span>°
					</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">
						Direction: <span className="animate-pulse inline-block h-3 bg-gray-200 rounded-4 w-12"></span>
					</span>
				</div>

				<div className="weather__card__info__item flex flex-col">
					<span className="weather__card__info__item__title text-lg text-gray-700 font-semibold mb-1">Other</span>

					<span className="weather__card__info__item__value text-sm text-gray-500">
						Humidity: <span className="animate-pulse inline-block h-3 bg-gray-200 rounded-4 w-12"></span>
					</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">
						UV: <span className="animate-pulse inline-block h-3 bg-gray-200 rounded-4 w-12"></span>
					</span>
					<span className="weather__card__info__item__value text-sm text-gray-500">
						Pressure: <span className="animate-pulse inline-block h-3 bg-gray-200 rounded-4 w-12"></span>
					</span>
				</div>
			</div>
		</div>
	);
}

export default WeatherCardSkeleton;
