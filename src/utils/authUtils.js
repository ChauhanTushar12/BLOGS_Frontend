// // Check if user is authenticated
// export const isAuthenticated = () => {
//   const token = localStorage.getItem("accessToken");
//   return !!token;
// };

// // Get current user token
// export const getAuthToken = () => {
//   return localStorage.getItem("accessToken");
// };

// // Clear all auth data
// export const clearAuth = () => {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");
// };

// // Check if token is expired
// export const isTokenExpired = (token) => {
//   if (!token) return true;
  
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     const decoded = JSON.parse(jsonPayload);
    
//     if (!decoded.exp) return true;
    
//     const currentTime = Date.now();
//     const expiryTime = decoded.exp * 1000;
    
//     return currentTime >= expiryTime;
//   } catch (e) {
//     return true;
//   }
// }; 