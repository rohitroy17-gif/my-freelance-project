import React, { useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { useAuthContext } from "./AuthProvider";

const navigationData = [
  { name: "Home", path: "/", id: 1 },
  { name: "All Jobs", path: "/all-jobs", id: 2 },
  { name: "Add a Job", path: "/add-job", id: 3 },
  { name: "My Accepted Tasks", path: "/my-tasks", id: 4 },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuthContext();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/my-profile");
  };

  return (
    <nav className="flex justify-between items-center mx-10 h-[100px] relative">
      {/* Logo */}
      <NavLink to="/" className="flex items-center">
        <img className="w-[40px] h-[40px] mr-2" src="/logo.png" alt="Logo" />
        <p className="text-pink-400 font-bold">Hero.IO</p>
      </NavLink>

      {/* Mobile Menu Icon */}
      <span className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </span>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden absolute left-0 bg-[#5f715f] text-white items-center transition-all duration-500 ${
          open ? "top-[10px]" : "-top-96"
        }`}
      >
        {navigationData.map((route) => (
          <li key={route.id} className="py-3 w-full text-center border-b border-gray-300">
            <NavLink to={route.path} onClick={() => setOpen(false)}>
              {route.name}
            </NavLink>
          </li>
        ))}

        {!user && (
          <>
            <li className="py-3">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="py-3">
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center">
        {navigationData.map((route) => (
          <li key={route.id}>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                isActive ? "text-pink-400 font-bold" : "text-pink-400 font-bold"
              }
            >
              {route.name}
            </NavLink>
          </li>
        ))}

        {!user ? (
          <>
            <li>
              <NavLink to="/login">
                <button className="btn text-white bg-gradient-to-r from-[#9F62F2] to-[#632EE3]">
                  Login
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                <button className="btn text-white bg-gradient-to-r from-[#9F62F2] to-[#632EE3]">
                  Register
                </button>
              </NavLink>
            </li>
          </>
        ) : (
          <li className="flex items-center gap-3">
            {/* Profile Picture */}
            <img
              src={user.photoURL || "/default-profile.png"}
              alt={user.displayName || "Profile"}
              className="w-10 h-10 rounded-full cursor-pointer border"
              onClick={handleProfileClick}
              title="My Profile"
            />
            {/* Logout Button */}
            <button
              onClick={logOut}
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

