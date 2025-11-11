import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./AuthProvider";

const AddJob = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: ""
  });

  const categories = [
    "Web Development",
    "App Development",
    "Digital Marketing",
    "Graphics Designing",
    "Content Writing",
    "SEO",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to add a job");

    const jobData = {
      ...formData,
      postedBy: user.displayName,
      userEmail: user.email,
      postedDate: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://freelance-server-six.vercel.app/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (res.ok) {
        toast.success("Job added successfully!");
        setFormData({ title: "", category: "", summary: "", coverImage: "" });
        setTimeout(() => navigate("/all-jobs"), 1500);
      } else {
        toast.error("Failed to add job");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <ToastContainer position="top-right" autoClose={1500} />
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Job Summary"
          className="w-full border px-3 py-2 rounded h-32"
          required
        />
        <input
          type="text"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;



