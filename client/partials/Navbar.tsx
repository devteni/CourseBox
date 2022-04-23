import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useAppSelector, useAuth } from '../hooks';
import { useRouter } from 'next/router';

const Links = [
  {
    text: 'home',
    link: '/',
  },
  {
    text: 'about',
    link: '/about',
  },
  
];

const authLinks = [
  {
    text: 'login',
    link: '/auth/login',
  },
  {
    text: 'signup',
    link: '/auth/signup',
  },
];

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated} = useAppSelector((state) => state.auth);
  // const isAuth = useAuth();

  const handleClick = (e: any) => {
    const navlinks = document.getElementsByClassName('nav-links')[0];
    navlinks.classList.toggle('hidden');
    setIsOpen(!isOpen);
  };
  return (
    <>
      {
        isAuthenticated
         ? 
        (<>
          <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
            <span><a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <span className="ml-3 text-xl">CourseBox</span>
            </a>
            </span>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
              <UserCircleIcon />
            </button>
          </div>
        </>) :
        <nav className="nav">
          <p className="logo">CourseBox</p>

          <ul className="hidden nav-links" id="nav-links">
            {Links.map((link, i) => {
              return (
                <li key={i} className="nav-link" onClick={handleClick}>
                  <Link href={link.link}>{link.text}</Link>
                </li>
              );
            })}

            <ul className="" id="authLinks">
              {authLinks.map((link, i) => {
                return (
                  <li key={i} className="nav-link" onClick={handleClick}>
                    <Link href={link.link}>{link.text}</Link>
                  </li>
                );
              })}
            </ul>
          </ul>

          <span className="toggle-btn" onClick={handleClick}>
            <span className="bar"></span>
            <span className="bar"></span>
          </span>
        </nav>
      }
    </>
    
  );
};

export default Navbar;