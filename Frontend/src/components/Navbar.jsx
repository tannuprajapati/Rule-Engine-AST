import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaLayerGroup, FaCheck, FaList, FaEdit, FaThList } from 'react-icons/fa'; 
import { HiMenuAlt3, HiX } from 'react-icons/hi'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 fixed top-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide transition-transform transform hover:scale-105">
        RuleCreater
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-semibold relative group transition-transform transform hover:scale-105 ease-in-out duration-200"
            >
              <FaPlus className="mr-2 inline" /> Create Rule
              <span className="block h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/combine-rules"
              className="text-white text-lg font-semibold relative group transition-transform transform hover:scale-105 ease-in-out duration-200"
            >
              <FaLayerGroup className="mr-2 inline" /> Combine Rules
              <span className="block h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/evaluate-rule"
              className="text-white text-lg font-semibold relative group transition-transform transform hover:scale-105 ease-in-out duration-200"
            >
              <FaCheck className="mr-2 inline" /> Evaluate Rule
              <span className="block h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/display-rules"
              className="text-white text-lg font-semibold relative group transition-transform transform hover:scale-105 ease-in-out duration-200"
            >
              <FaList className="mr-2 inline" /> Display Rules
              <span className="block h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/modify-rules"
              className="text-white text-lg font-semibold relative group transition-transform transform hover:scale-105 ease-in-out duration-200"
            >
              <FaEdit className="mr-2 inline" /> Modify Rules
              <span className="block h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/getall-rules"
              className="text-white text-lg font-semibold relative group transition-transform transform hover:scale-105 ease-in-out duration-200"
            >
              <FaThList className="mr-2 inline" /> Get All Rules
              <span className="block h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <HiX className="w-8 h-8" /> : <HiMenuAlt3 className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center space-y-8 z-40">
          <Link
            to="/"
            onClick={toggleMenu}
            className="text-white text-2xl font-semibold transition-transform transform hover:scale-105 ease-in-out duration-200"
          >
            <FaPlus className="mr-2 inline" /> Create Rule
          </Link>
          <Link
            to="/combine-rules"
            onClick={toggleMenu}
            className="text-white text-2xl font-semibold transition-transform transform hover:scale-105 ease-in-out duration-200"
          >
            <FaLayerGroup className="mr-2 inline" /> Combine Rules
          </Link>
          <Link
            to="/evaluate-rule"
            onClick={toggleMenu}
            className="text-white text-2xl font-semibold transition-transform transform hover:scale-105 ease-in-out duration-200"
          >
            <FaCheck className="mr-2 inline" /> Evaluate Rule
          </Link>
          <Link
            to="/display-rules"
            onClick={toggleMenu}
            className="text-white text-2xl font-semibold transition-transform transform hover:scale-105 ease-in-out duration-200"
          >
            <FaList className="mr-2 inline" /> Display Rules
          </Link>
          <Link
            to="/modify-rules"
            onClick={toggleMenu}
            className="text-white text-2xl font-semibold transition-transform transform hover:scale-105 ease-in-out duration-200"
          >
            <FaEdit className="mr-2 inline" /> Modify Rules
          </Link>
          <Link
            to="/getall-rules"
            onClick={toggleMenu}
            className="text-white text-2xl font-semibold transition-transform transform hover:scale-105 ease-in-out duration-200"
          >
            <FaThList className="mr-2 inline" /> Get All Rules
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
