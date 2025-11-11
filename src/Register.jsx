import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, googleLogin } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {name, email, photoURL, password} = formData;

    // Password validation
    if (!/[A-Z]/.test(password)) return toast.error("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) return toast.error("Password must contain at least one lowercase letter.");
    if (password.length < 6) return toast.error("Password must be at least 6 characters long.");

    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL
      });

      toast.success("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input type="text" name="name" className="w-full border px-3 py-2 rounded"
           onChange={handleChange} required />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input type="email" name="email" className="w-full border px-3 py-2 rounded"
           onChange={handleChange} required />
        </div>

        <div>
          <label className="block font-semibold mb-1">Photo URL</label>
          <input type="text" name="photoURL" className="w-full border px-3 py-2 rounded" onChange={handleChange} />
        </div>

        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input type="password" name="password" className="w-full border px-3 py-2 rounded"
           onChange={handleChange} required />
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Register
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
      </p>

      <button onClick={handleGoogleLogin}
        className="mt-4 w-full border border-gray-400 py-2 rounded hover:bg-gray-100">
        Continue with Google
      </button>
    </div>
  );
};

export default Register;
