import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true; // If no token is provided, consider it expired
  
  try {
    const decodedToken = jwtDecode(token);
    
    // If there's no 'exp' field in the token, consider it expired
    if (!decodedToken.exp) {
      return true;
    }
    // Check if the token is expired
    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token:', error);
    // If there's an error decoding, consider the token expired or invalid
    return true;
  }
};