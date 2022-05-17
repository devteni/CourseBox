import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { API_URL } from '../../../constants';
import { DocumentReportIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import pic from "../../../public/assets/mis.jpg"
import { fetchCourseMaterials, fetchLecturerCourses} from '../../../slices/course/course';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';


const [CourseMaterial] = [
    dynamic(() => import("@/components/CourseMaterial"))
];

type course = {
    id: number,
    courseCode: string,
    courseName: string,
    userId: string,
    departmentId: string,
    schoolId: string,
    courseDesc: string,
    createdAt: string,
    modifiedAt: string,
}

type currentUser = { 
    access_token: string;
    role: string;
}

interface courseMaterial { 
    title: string;
    description: string;
    file: {
        id: string,
        url: string,
        fileName: string,
    }
}

const Course = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  let { name } = router.query;
  const { user } = useAppSelector((state) => state.auth);
  const { courses, courseMaterials } = useAppSelector((state) => state.course);
  const [currentUser, setCurrentUser] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [validCourse, setValidCourse] = useState<course>({
    id: 0,
    courseCode: '',
    courseName: '',
    userId: '',
    departmentId: '',
    schoolId: '',
    courseDesc: '',
    createdAt: '',
    modifiedAt: ''
    });
  const [courseMaterial, setCourseMaterial] = useState<courseMaterial>({ title: "", description: "", file: {} });
  const vCourse = courses.find(({courseName}) =>  courseName === name)!; 
  const payload = { ...user };
  payload.courseId = validCourse.id;

    const closeModal = () => {
        setShowModal(false);
        setCourseMaterial({title: "", description: "", file: new Blob()})
    }
    
    const addMaterial = async () => {
        try {
            const data = new FormData();
            data.append('title', courseMaterial.title);
            data.append('courseMaterial', courseMaterial.file);
            data.append('description', courseMaterial.description);
            data.append('courseId', vCourse.id);
            const res = await axios.post(`${API_URL}/courses/upload`, data, { 
                headers: {
                    "Authorization": `Bearer ${currentUser.access_token}`
                    }
                });
            setCourseMaterial({title: "", description: "", file: new Blob() })
            setShowModal(false);
            toast.success("Course material added successfully");
            dispatch(fetchCourseMaterials(payload))
        } catch (error: any) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || error.message || error.toString()
            if(message) toast.error(message || 'An error occurred while uploading course material')
        }
    }

    
    useEffect(() => {
        if (user) setCurrentUser(user)
        if (courses.length > 0) {
            const validCourse: course = courses.find(({courseName}) =>  courseName === name)!;
            setValidCourse(validCourse);
            payload.courseId = validCourse.id;
            dispatch(fetchCourseMaterials(payload));
        } else {
            dispatch(fetchLecturerCourses(user));
        }
    }, [user])
    
  return (
    <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image layout='responsive' width={200} height={200} className="object-cover object-center rounded" alt="hero" src={pic} />
        </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 uppercase">{name}
                <br className="hidden lg:inline-block" /><small>{}</small>
                </h1>
                <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
                <div className="flex justify-center">
                { currentUser.role === "LECTURER" ? <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => setShowModal(true)}>New Material</button>: '' }
                </div>
            </div>
        </div>

        {/* Add new material modal */}
        <>
        {showModal ? (
            <>
            <div
                className="duration-700 ease-in-out justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Upload course material
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => closeModal()}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <form encType='multipart/form-data' action='POST'>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title*
                                </label>
                                <input 
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="title"
                                    name='title'
                                    type="text"
                                    value={courseMaterial.title}
                                    placeholder="Title of the resource" 
                                    onChange={(e) => setCourseMaterial({ ...courseMaterial, title: e.currentTarget.value})}
                                    required/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description*
                                </label>
                                <textarea 
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="description" 
                                    name='description'
                                    value={courseMaterial.description}
                                    placeholder="Description of the resource" 
                                    onChange={(e) =>setCourseMaterial({ ...courseMaterial, description: e.currentTarget.value})}
                                    required></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseMaterial">
                                    Course Material*
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="courseMaterial" 
                                    name='courseMaterial'
                                    type="file" 
                                    accept='.docx,.pdf'
                                    placeholder="Upload course material" 
                                    onChange={(e) => { 
                                        const file = e.currentTarget.files[0];
                                        setCourseMaterial({ ...courseMaterial, file: file })
                                    }}
                                    required/>
                            </div>
                            
                        </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => closeModal()}
                    >
                        Close
                    </button>
                    <button
                        className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => addMaterial()}
                    >
                        Add
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </>

        <CourseMaterial courseMaterials={courseMaterials} user={currentUser}/>
    </section>
  )
}

export default Course;

