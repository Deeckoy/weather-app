import axios from "axios";

const fetchWeather = async (city) => {
	const validateCity = (city) => {
		if (city) {
			return city;
		} else {
			return "Chisinau";
		}
	};

	const options = {
		method: "GET",
		url: "https://weatherapi-com.p.rapidapi.com/current.json",
		params: { q: validateCity(city) },
		headers: {
			"X-RapidAPI-Key": "97257f17b1msha634cf96e160c55p1854c1jsne43395f97f64",
			"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
		},
	};

	return axios
		.request(options)
		.then((response) => {
			return Promise.resolve({ weatherData: response.data, loading: false });
		})
		.catch((error) => {
			console.error(error);
		});
};

export default fetchWeather;
