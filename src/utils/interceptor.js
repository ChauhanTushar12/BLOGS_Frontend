import axios from 'axios';

const interceptor = axios.create({
  baseURL: 'http://localhost:1000/api/v1',
});

const refreshToken = async () => {
  try {
    const oldRefreshToken = localStorage.getItem("refreshToken");
    if (!oldRefreshToken) throw new Error("Refresh token missing");

    const response = await axios.post("http://localhost:1000/api/v1/refreshToken", {
      refreshToken: oldRefreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (!accessToken || !newRefreshToken) throw new Error("Tokens missing in response");

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (err) {
    console.error("Token refresh failed:", err);
    localStorage.clear();
    window.location.href = "/login";
  }
};

const isTokenExpiringSoon = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    const currentTime = Date.now();
    const expiryTime = decoded.exp * 1000;
    const timeLeftInMinutes = (expiryTime - currentTime) / 1000 / 60;

    if (timeLeftInMinutes < 5) {
      await refreshToken();
    }
  } catch (err) {
    console.error("Error parsing token:", err);
    localStorage.clear();
    window.location.href = "/login";
  }
};

interceptor.interceptors.request.use(
  async (config) => {
    await isTokenExpiringSoon();

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return interceptor(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

setInterval(async () => {
  await isTokenExpiringSoon();
}, 60000);

export default interceptor;