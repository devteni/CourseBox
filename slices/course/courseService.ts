import axios from "axios";
import { API_URL } from "../../constants";


const fetchLecturerCourses = async (userId: any, access_token: any) => {
    const response = await axios.get(`${API_URL}/courses/lecturer/${userId}`, { headers: { "Authorization": `Bearer ${access_token}`}});
    return response.data;
}

const fetchCourses = async (deptId: any, access_token: any) => {
    const response = await axios.get(`${API_URL}/courses/student/${deptId}`, { headers: { "Authorization": `Bearer ${access_token}`}});
    return response.data;
}

const fetchCourseMaterials = async (courseId: any, access_token: any) => {
    const response = await axios.get(`${API_URL}/courses/${courseId}`, { headers: { "Authorization": `Bearer ${access_token}`}});
    return response.data;
}


const courseService = { fetchCourses, fetchLecturerCourses, fetchCourseMaterials };
export default courseService; 