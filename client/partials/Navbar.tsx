import { useState } from 'react';
import Link from 'next/link';

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
    link: '/login',
  },
  {
    text: 'signup',
    link: '/signup',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: any) => {
    const navlinks = document.getElementsByClassName('nav-links')[0];
    navlinks.classList.toggle('hidden');
    setIsOpen(!isOpen);
  };
  return (
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
  );
};

export default Navbar;