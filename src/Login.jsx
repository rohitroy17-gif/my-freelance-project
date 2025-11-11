import { useContext, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(formData.email, formData.password)
      .then(() => {
        toast.success("Login Successful!");
        setTimeout(() => navigate("/"), 1000);
      })
      .catch(() => toast.error("Invalid email or password!"));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Google Login Successful!");
        setTimeout(() => navigate("/"), 1000);
      })
      .catch(() => toast.error("Google Login Failed"));
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <p className="text-sm text-blue-600 cursor-pointer hover:underline">
          Forget Password?
        </p>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <p>Don't have an account?
          <Link to="/register" className="text-blue-600 ml-1">Register</Link>
        </p>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full mt-4 border py-2 rounded hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
