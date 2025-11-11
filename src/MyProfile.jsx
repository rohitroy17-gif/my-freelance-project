import React from "react";
import { useAuthContext } from "./AuthProvider";

const MyProfile = () => {
  const { user } = useAuthContext();

  if (!user) return <p className="text-center mt-10">Please login to see your profile.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <div className="flex items-center gap-6">
        <img
          src={user.photoURL || "/default-profile.png"}
          alt={user.displayName}
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
