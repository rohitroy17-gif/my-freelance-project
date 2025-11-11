import React, { useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router"; // FIXED
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { useAuthContext } from "./AuthProvider";
import image from "../src/assets/Freee_logo.png";

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
    setOpen(false);
  };
  const handleThemeToggle = () => {
  document.body.classList.toggle("dark-mode");
};

  return (
    <nav className="flex justify-between items-center mx-4 md:mx-10 py-4 relative">
      {/* Logo */}
      <NavLink to="/" className="flex items-center">
        <img className="w-[40px] h-[40px] mr-2" src={image} alt="Logo" />
        <p className="text-pink-400 font-serif text-3xl md:text-4xl">ProLancer</p>
      </NavLink>

      {/* Mobile Menu Toggle */}
      <span className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </span>

      {/* Mobile Dropdown Menu */}
      <ul
        className={`md:hidden absolute left-0 w-full bg-[#5f715f] text-white text-center transition-all duration-500 ${
          open ? "top-[80px]" : "-top-[400px]"
        } py-4 z-50`}
      >
        {navigationData.map((route) => (
          <li key={route.id} className="py-3 border-b border-gray-300">
            <NavLink to={route.path} onClick={() => setOpen(false)}>
              {route.name}
            </NavLink>
          </li>
        ))}

        {/* Show Profile + Logout when logged in */}
        {user ? (
          <>
            <li className="py-3 flex justify-center">
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full border cursor-pointer"
                onClick={handleProfileClick}
              />
            </li>
            <li className="py-3">
              <button
                onClick={() => { logOut(); setOpen(false); }}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="py-3">
              <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
            </li>
            <li className="py-3">
              <NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Desktop Menu */}
      <button onClick={handleThemeToggle} className="px-3 py-1 border rounded">
       Toggle Theme
       </button>
      <ul className="hidden md:flex gap-6 items-center">
        {navigationData.map((route) => (
          <li key={route.id}>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                isActive ? "text-pink-500 font-bold" : "text-pink-400 font-semibold"
              }
            >
              {route.name}
            </NavLink>
          </li>
        ))}

        {/* Desktop Auth Buttons */}
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
            <img
              src={user.photoURL || "/default-profile.png"}
              alt={user.displayName}
              className="w-10 h-10 rounded-full cursor-pointer border"
              onClick={handleProfileClick}
              title="My Profile"
            />
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


