import Link from "next/link";

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
    return(
        <div>
            <ul>
                {
                    data.map((el, i) => {
                        return (<li key={i}>
                                <Link href={el.link}>{el.text}</Link>
                            </li>)
                    })
                }  
            </ul>
            
        </div>
    )
};

export default Sidebar;