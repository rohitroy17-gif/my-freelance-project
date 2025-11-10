import React from "react";
import { Link } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link to="/">
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
