import axios from "axios";
import { API_URL } from "../../constants";


const fetchCourses = async (userId: any, access_token: any) => {
    const response = await axios.get(`${API_URL}/courses/${userId}`, { headers: { "Authorization": `Bearer ${access_token}`}});
    console.log(response)
    return response.data;
}

const courseService = { fetchCourses };
export default courseService; 