import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setAuthorized, setUser } from '../slices/auth/auth'
import Sidebar from './Sidebar';
import styles from '../styles/Home.module.css'
import Cookies from 'js-cookie';



function Layout({ children }: any) {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        // on initial load - run auth check 
        function authCheck(url: string=router.asPath) {
            // redirect to login page if accessing a private page and not logged in 
            const publicPaths = ['/', '/auth/login', '/auth/signup'];
            const path = url.split('?')[0];
            const auth = Cookies.get('user')!;
            if (!auth && !publicPaths.includes(path)) {
                dispatch(setAuthorized(false));
                router.push({
                    pathname: '/auth/login',
                    query: { returnUrl: router.asPath }
                });
            } else if (publicPaths.includes(path)) {
                dispatch(setAuthorized(false));
            } else {
                dispatch(setUser(JSON.parse(auth)));
                dispatch(setAuthorized(true))
            }
        }
        authCheck();

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className=''>
            <Sidebar />
            <div className='absolute right-0 bg-[#f6f7f9] lg:w-4/5 h-[100vh] py-2'>
                {children}
            </div>
        </div>
    );
}

export default Layout;

