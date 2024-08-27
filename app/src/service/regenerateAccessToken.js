import axios from "axios";
import { BASE_URL } from "../constants/constants";
import * as SecureStore from 'expo-secure-store';

export const regenerateToken = async (oldToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/regenerate-access-token`, { refreshToken: oldToken });
      if (response.data.token) {
        await SecureStore.setItemAsync('userToken', response.data.token);
        return response.data.token;
      }
      return token;
    } catch (error) {
      console.error("Token regeneration error:", error);
      return null;
    }
  };