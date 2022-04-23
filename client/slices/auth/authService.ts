import axios from "axios";
import { API_URL } from "../../constants";

// Register user.
const register = async (userData: object) => {
    const response = await axios.post(`${API_URL}/users/create`, userData);
    if(response.data) {
        localStorage.setItem('user', JSON.stringify((response.data)));   
    }
    return response.data;
}

const login = async (payload: object) => {
    const response = await axios.post(`${API_URL}/auth/login`, payload);
    if(response.data) {
        localStorage.setItem('user', JSON.stringify((response.data)));   
    }
    return response.data;
}

const logout = () => localStorage.removeItem('user');

const authService = {
    register,
    login,
    logout,
};

export default authService;