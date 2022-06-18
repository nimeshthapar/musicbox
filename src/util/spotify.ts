import axios from 'axios';

const redirectedUrl = 'https://musicbox-e4946.web.app';
const cliendId = `${process.env.REACT_APP_CLIENT_ID}`;
const authEndpoint = 'https://accounts.spotify.com/authorize?';
const scopes = ['playlist-read-private', 'user-library-read'];

export const loginEndPoint = `${authEndpoint}client_id=${cliendId}&redirect_uri=${redirectedUrl}&scope=${scopes.join(
	'%20'
)}&response_type=token`;

const apiClient = axios.create({
	baseURL: 'https://api.spotify.com/v1/',
});

export const setClientToken = (token: string) => {
	apiClient.interceptors.request.use(async function (config) {
		config.headers!.Authorization = 'Bearer ' + token;
		return config;
	});
};

export default apiClient;
