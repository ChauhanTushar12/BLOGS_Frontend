import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:1000/api/v1',
});

const refreshTokens = async () => {
  try {
    const oldRefreshToken = localStorage.getItem("refreshToken");
    if (!oldRefreshToken) throw new Error("No refresh token found");

    const response = await axios.post("http://localhost:1000/api/v1/refreshToken", {
      refreshToken: oldRefreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (!accessToken || !newRefreshToken) throw new Error("Token(s) missing in response");

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.clear();
    window.location.href = "/login";
  }
};

const isTokenExpiring = async () => {
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

    const timeLeftInMin = (expiryTime - currentTime) / 1000 / 60;
    if (timeLeftInMin < 5) {
      await refreshTokens();
    }
  } catch (err) {
    console.error("Token parsing failed:", err);
    localStorage.clear();
    window.location.href = "/login";
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    await isTokenExpiring();
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshTokens();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

setInterval(async () => {
  await isTokenExpiring();
}, 60000);

export default apiClient;