// // utils/refreshToken.js
// import axios from "axios";

// export const refreshToken = async () => {
//   try {
//     const res = await axios.post("http://localhost:1000/api/v1/refresh-token", {}, {
//       withCredentials: true,
//     });

//     const accessToken = res.data?.accessToken;
//     if (accessToken) {
//       localStorage.setItem("accessToken", accessToken);
//       return accessToken;
//     }
//   } catch (err) {
//     console.error("Refresh token failed", err);
//     return null;
//   }
// };

// export default refreshToken;
