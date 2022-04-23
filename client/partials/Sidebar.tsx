import Link from "next/link";
import { CashIcon, LogoutIcon, UserIcon, XCircleIcon } from '@heroicons/react/solid'
import { useAppDispatch } from "../hooks";
import { logout } from "../slices/auth/auth";

const data = [
    {
        "text": "Dashboard",
        "link": "/dashboard"
    },
    {
        "text": "Courses",
        "link": "/dashboard"
    },
    {
        "text": "My Profile",
        "link": "/dashboard"
    },
    {
        "text": "Setting",
        "link": "/dashboard"
    },
    {
        "text": "Classroom",
        "link": "/dashboard"
    },
]

const Sidebar = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout)
    }
    return(
        // <div>
        //     <ul>
        //         {
        //             data.map((el, i) => {
        //                 return (<li key={i}>
        //                         <Link href={el.link}>{el.text}</Link>
        //                     </li>)
        //             })
        //         }  
        //     </ul>
            
        // </div>
        <>
        <div className="flex items-end justify-end px-4">
          <div
            className={` fixed top-0  z-20 h-screen w-10/12 bg-gray-200 shadow-2xl delay-150 duration-200 ease-out lg:w-72`}
          >
            <XCircleIcon
              width={40}
              className="absolute top-0 right-0 cursor-pointer p-2"
            //   onClick={''}
            />
            <nav role="navigation" className="p-6">
              <div className="flex items-center gap-4 pb-4 font-medium text-gray-600">
                <p>PLAN.COM</p>
              </div>
  
              <div className="relative -mx-4 mt-4 h-[85vh] overflow-y-auto overflow-x-hidden">
                <ul className="mb-12 space-y-4 px-4">
                  <li className="cursor-pointer">
                    <Link href="/events/all">
                      <span className="flex items-center gap-4 text-gray-600 transition hover:text-indigo-500">
                        <UserIcon width={30} />
                        <p>Events Types</p>
                      </span>
                    </Link>
                  </li>
                  <li className="cursor-pointer">
                    <Link href="/">
                      <span className="flex items-center gap-4 text-gray-600 transition hover:text-indigo-500">
                        <CashIcon width={30} />
                        <p>Bookings</p>
                      </span>
                    </Link>
                  </li>
                  <li className="cursor-pointer" onClick={() => handleLogout()}>
                    <span className="flex items-center gap-4 text-gray-600 transition hover:text-indigo-500">
                      <LogoutIcon width={30} />
                      <p>Logout</p>
                    </span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          
        </div>
      </>
    )
};

export default Sidebar;