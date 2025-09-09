import axios from "axios";
import cookie from "js-cookie";

// Constants for token and refresh token cookie names
const TOKEN = "access";
const REFRESH_TOKEN = "refresh";

// Determine the base URL based on the environment (production or development)
export const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL_PRODUCTION
    : import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance with default configuration
const AxiosConfigInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL
  withCredentials: true, // Send cookies with requests
  headers: {
    accept: "application/json", // Set default accept header
  },
});

// Add a request interceptor to handle authentication tokens
AxiosConfigInstance.interceptors.request.use(
  (request) => {
    // Retrieve token and refreshToken from cookies
    const token = cookie.get(TOKEN);
    const refreshToken = cookie.get(REFRESH_TOKEN);

    // Add Authorization header if token exists
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    // Add custom "refresh-token" header if refreshToken exists
    if (refreshToken) {
      request.headers["refresh"] = refreshToken;
    }

    // Return the modified request
    return request;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses and errors
AxiosConfigInstance.interceptors.response.use(
  (response) => {
    // Return the response data if the request is successful
    return response;
  },
  async (error) => {
    // Handle 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      // Remove user data from localStorage
      localStorage.removeItem("user");
    }
    // Handle 403 Forbidden error
    if (error.response && error.response.status === 403) {
      // Remove user data from localStorage
      localStorage.removeItem("user");
    }

    // Return the error to the calling code
    return Promise.reject(error);
  }
);

// Export the Axios instance for use in other parts of the application
export default AxiosConfigInstance;
