import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../slices/auth/auth";

const Index = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        if(typeof window !== undefined && window.localStorage) {
            const user = localStorage.getItem('user');
            if (user) {
                dispatch(setUser(user));
                router.push('/app/dashboard')
            } else {
                router.push('/auth/login')
            }
        }
    })
    return (
        <div>
        </div>
    )
}


export default Index;