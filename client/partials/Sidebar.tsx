import Link from "next/link";

const data = [
    {
        "text": "Dashboard",
        "link": "/dashboard"
    },
    {
        "text": "Dashboard",
        "link": "/dashboard"
    },
    {
        "text": "Dashboard",
        "link": "/dashboard"
    },
    {
        "text": "Dashboard",
        "link": "/dashboard"
    },
    {
        "text": "Dashboard",
        "link": "/dashboard"
    },
    {
        "text": "Dashboard",
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