export type Course = {
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

export type NavbarProps = {
    isAuth: boolean,
}

export type CurrentUser = { 
    id: number
    firstName: string
    lastName: string
    email: string
    uniqueNumber: string
    password: string
    departmentId: number
    department: string
    school: string
    schoolId: number
    role: string
    access_token: string
    createdAt: string
    modifiedAt: string
}

export interface CourseMaterial { 
    title: string;
    description: string;
    file: { id: string, url: string, fileName: string} | File   
}