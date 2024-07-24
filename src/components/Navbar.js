import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="bg-white p-4 rounded-full shadow-lg m-2">
            <nav className="flex justify-between items-center px-4 ">

                <div className="hidden md:flex space-x-4">
                    <Link to="/CoursePage" className="text-black hover:text-gray-700">Home</Link>
                    {/* <Link to="/programs" className="text-black hover:text-gray-700">Programs</Link>
                    <Link to="/blog" className="text-black hover:text-gray-700">Blog</Link> */}
                </div>

                <Link to="/" className="text-black font-bold">
                Skill Rise
                </Link>

                <div className="hidden md:flex space-x-4">
                    {/* <Link to="/about-us" className="text-black hover:text-gray-700">About us</Link>
                    <Link to="/contact-us" className="text-black hover:text-gray-700">Contact us</Link> */}
                    <Link to="/login" className="text-black hover:text-gray-700">My Account</Link>

                </div>
                <button
                    onClick={toggleMenu}
                    className="md:hidden block focus:outline-none outline-none"
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4zM4 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                        </svg>
                    )}
                </button>
            </nav>

            {isOpen && (
                <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full my-16 text-center bg-white shadow-lg">
                    <nav className="px-4 py-2 flex flex-col space-y-2 h-screen">
                        <Link to="/CoursePage" className="text-black hover:text-gray-700" onClick={closeMenu}>Home</Link>
                        {/* <Link to="/programs" className="text-black hover:text-gray-700" onClick={closeMenu}>Programs</Link>
                        <Link to="/blog" className="text-black hover:text-gray-700" onClick={closeMenu}>Blog</Link>
                        <Link to="/about-us" className="text-black hover:text-gray-700" onClick={closeMenu}>About Us</Link>
                        <Link to="/contact-us" className="text-black hover:text-gray-700" onClick={closeMenu}>Contact Us</Link> */}
                        <Link to="/login" className="text-black hover:text-gray-700" onClick={closeMenu}>My Account</Link>

                    </nav>
                </div>
            )}
        </div>
    );
}

export default Navbar;
