import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchCourses, fetchLecturerCourses, setCourses } from "../../../slices/course/course";


const Index: NextPage = () => {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { courses } = useAppSelector((state) => state.course)

    useEffect(() => {
        if (isAuthenticated && user.role === "LECTURER") {
            dispatch(fetchLecturerCourses(user))
            dispatch(setCourses(courses))
        } else if (isAuthenticated && user.role === "STUDENT") {
            dispatch(fetchCourses(user))
            dispatch(setCourses(courses))
        }
    }, [])

    return(
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Your Courses</h2>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 uppercase">DEPARTMENT OF {user.department}</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven&quot;t heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
                    </div>
                    <div className="flex flex-wrap justify-around">
                        {
                            courses.length === 0 ? 
                            <div>No courses assigned yet!</div> 
                            :courses.map((course, i) => {
                                return <Link key={i+8942} href={`/app/courses/${course.courseName}`}>
                                            <div className="relative xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-2 border-gray-200 border-opacity-60 cursor-pointer">
                                            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{course.courseName.toUpperCase()}</h2>
                                            <p className="leading-relaxed text-base mb-4">{course.courseDesc}</p>
                                            <p className="absolute bottom-0 mb-2">
                                            <a className="text-indigo-500 inline-flex items-center">Learn More
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a> 
                                            </p>
                                            </div>
                                        </Link>
                                    })
                        }
                    </div>

                                    
                    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Contact Admin</button>
                </div>
            </section>
        </div>
    )
}

export default Index;