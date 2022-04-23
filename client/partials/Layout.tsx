import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setAuthorized } from '../slices/auth/auth'


function Layout({ children }: any) {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

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
    }, [setAuthorized, authCheck, router]);

    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/auth/login'];
        const path = url.split('?')[0];
        if (!user && !publicPaths.includes(path)) {
            dispatch(setAuthorized(false));
            router.push({
                pathname: '/auth/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            dispatch(setAuthorized(true));
        }
    }

    return (isAuthenticated && children);
}

export default Layout;