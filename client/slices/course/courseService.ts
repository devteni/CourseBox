import axios from "axios";
import { API_URL } from "../../constants";


const fetchLecturerCourses = async (userId: any, access_token: any) => {
    const response = await axios.get(`${API_URL}/courses/lecturer/${userId}`, { headers: { "Authorization": `Bearer ${access_token}`}});
    console.log(response)
    return response.data;
}

const fetchCourses = async (deptId: any, access_token: any) => {
    const response = await axios.get(`${API_URL}/courses/student/${deptId}`, { headers: { "Authorization": `Bearer ${access_token}`}});
    console.log(response)
    return response.data;
}


const courseService = { fetchCourses, fetchLecturerCourses };
export default courseService; 