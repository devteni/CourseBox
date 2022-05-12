import { API_URL } from '@/constants';
import { DocumentReportIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type material = {
    title: string,
    description: string,
    file: {
        id: string,
        url: string,
        fileName: string,
    }
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    uniqueNumber: string;
    password: string;
    departmentId: number
    schoolId: number
    role: string
    access_token: string;
    createdAt: string;
    modifiedAt: string
}

interface courseMaterial { 
    title: string;
    description: string;
    file: {
        id: number,
        url: string,
        fileName: string,
    }
}

interface IProps {
    courseMaterials: courseMaterial[],
    user: User
}

const CourseMaterial: React.FC<IProps> = ({ courseMaterials, user }) => {
    const [reportModal, setReportModal] = useState(false);
    const [count, setCount] = useState('');

    const showReport = async (e: any) => {
        const value = e.target.value;
        const res = await axios.get(`${API_URL}/courses/students/downloads/${value}`, 
            { headers: 
                { "Authorization": `Bearer ${user.access_token}`}
            });
        setCount(res.data);
        setReportModal(true);
    }

    const incrementDownload = async(fileId: string) => {
        const payload = { fileId, studentId: user.id}
        try {
            const res = await axios.post(`${API_URL}/courses/students/downloads`, 
                    payload, { headers: 
                    { "Authorization": `Bearer ${user.access_token}`}
                });
            console.log(res.data);
            toast.success('True');
        } catch(error: any) {
            console.log(error.response.data)
        }
    }

    return <section id="courseMaterials" className='flex flex-row justify-between'>
        {courseMaterials?.map((el: material, i: number) => {
            if (el.file) {
                return (
                    <div key={i} className='relative w-1/3 h-2/3 border-2 mx-2 border-gray-300 p-4 text-center'>
                        <p className='uppercase text-base font-bold underline'>{el.title}</p>
                        <p className='px-3 my-2'>{el.description}</p>
                        <span className='my-4'>
                            <a className='p-2 bg-blue-500 rounded text-white'
                                onClick={() => incrementDownload(el.file.id)}
                                href={el.file.url} download={el.file.fileName} rel="noreferrer">
                                Download File
                            </a>
                            {user.role === 'LECTURER' ?
                            <button value={`${el.file.id}`} onClick={(e) => showReport(e)} className='cursor-pointer text-blue-500 float-right'>⬇️</button> :
                                ''}
                        </span>
                    </div>
                );
            }
        })}
        {reportModal ? (
            <>
                <div
                    className="duration-700 ease-in-out justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Download Report
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setReportModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <p>{count!} out of 1 student(s) have downloaded this material.</p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setReportModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
    </section>;
}

export default CourseMaterial;