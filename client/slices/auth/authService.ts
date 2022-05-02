import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../constants";

// Register user.
const register = async (userData: object) => {
    const response = await axios.post(`${API_URL}/users/create`, userData);
    return response.data;
}

const login = async (payload: object) => {
    const response = await axios.post(`${API_URL}/auth/login`, payload);
    return response.data;
}

const logout = () => { 
    Cookies.remove('user');
}

const authService = {
    register,
    login,
    logout,
};

export default authService;