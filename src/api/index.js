import Axios from "axios";
import { config } from "../config/constants";

const axios = Axios.create({
	baseURL: `${config.API_SERVER}`,
	headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (!token) return config;
		if (config.headers) config.headers.Authorization = `Bearer ${token}`;
		return Promise.resolve(config);
	},
	(error) => Promise.reject(error)
);

axios.interceptors.response.use(
	(response) => Promise.resolve(response),
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;
