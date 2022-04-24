import Link from "next/link";
import { HomeIcon, UserIcon, BookmarkAltIcon, AdjustmentsIcon, ClipboardListIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../slices/auth/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const sidebarData = [
    {
        "text": "Dashboard",
        "link": "/app/dashboard",
        "icon": <HomeIcon width={30}/>
    },
    {
        "text": "Courses",
        "link": "/app/courses",
        "icon": <BookmarkAltIcon width={30}/>
    },
    {
        "text": "My Profile",
        "link": "/app/profile",
        "icon": <UserIcon width={30}/>
    },
    {
        "text": "Setting",
        "link": "/app/dashboard",
        "icon": <AdjustmentsIcon width={30}/>
    },
    {
        "text": "Classroom",
        "link": "/app/dashboard",
        "icon": <ClipboardListIcon width={30}/>
    },
]

type currentUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  uniqueNumber: string
  password: string
  department: string
  school: string
  role: string
  access_token: string
  createdAt: string
  modifiedAt: string
  schoolId: number
  departmentId: number
}

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const [currentUser, setCurrentUser] = useState({});
    const { user, isAuthenticated} = useAppSelector((state) => state.auth);

    useEffect(() => {
      if (user) setCurrentUser(user)
    }, [user])

    const handleLogout = () => {
        dispatch(logout)
    }
    return(
        <>
        {
          isAuthenticated ? 
          (<div className="flex justify-start px-4">
          <div
            className={`z-20 w-10/12 border-2 shadow-xl delay-150 duration-200 ease-out lg:w-72`}
          >
            <nav role="navigation" className="p-6">
              <div className="flex items-center gap-4 pb-4 font-medium text-gray-600">
                <p className="text-xl py-4">Hi, {currentUser.firstName}. Welcome back!</p>
              </div>
  
              <div className="relative -mx-4 mt-4 h-[85vh] overflow-y-auto overflow-x-hidden">
                <ul className="mb-12 space-y-4 px-4">
                  {
                    sidebarData?.map((nav, i) => {
                     return <li key={i+89283} className="cursor-pointer">
                        <Link href={nav.link}>
                          <span className="flex items-center p-3 gap-4 text-gray-600 transition hover:text-indigo-500">
                            {nav.icon}
                            <p>{nav.text}</p>
                          </span>
                        </Link>
                      </li>
                    })
                  }
                  
                </ul>
              </div>
            </nav>
          </div>
          
        </div>) : null
        }
      </>
    )
};

export default Sidebar;