import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserPlus, FaProjectDiagram, FaUsers, FaHistory } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="h-screen w-60 bg-gradient-to-b from-cyan-500 to-blue-500 fixed flex flex-col items-center pt-10 shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-10">Menu</h2>
      <ul className="w-full text-center">
        <li className="mb-4">
          <Link
            to="/home"
            className="text-white text-lg font-semibold flex items-center justify-center hover:bg-cyan-600 p-3 block rounded transition duration-200"
          >
            <FaHome className="mr-2" /> Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/mainform"
            className="text-white text-lg font-semibold flex items-center justify-center hover:bg-cyan-600 p-3 block rounded transition duration-200"
          >
            <FaUserPlus className="mr-2" /> Add Employee
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/projectsection"
            className="text-white text-lg font-semibold flex items-center justify-center hover:bg-cyan-600 p-3 block rounded transition duration-200"
          >
            <FaProjectDiagram className="mr-2" /> Projects
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/view"
            className="text-white text-lg font-semibold flex items-center justify-center hover:bg-cyan-600 p-3 block rounded transition duration-200"
          >
            <FaUsers className="mr-2" /> Employees
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/history"
            className="text-white text-lg font-semibold flex items-center justify-center hover:bg-cyan-600 p-3 block rounded transition duration-200"
          >
            <FaHistory className="mr-2" /> Completed Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
