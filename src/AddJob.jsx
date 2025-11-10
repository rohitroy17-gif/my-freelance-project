import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddJob = () => {
  const navigate = useNavigate();

  // Simulate logged-in user info (replace with auth context or Firebase user)
  const user = {
    displayName: "John Doe",
    email: "john@example.com"
  };

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    coverImage: ''
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

    const jobData = {
      ...formData,
      postedBy: user.displayName,
      userEmail: user.email,
      postedDate: new Date().toISOString()
    };

    try {
      const res = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData)
      });

      if (res.ok) {
        toast.success("Job added successfully!");
        setFormData({ title: '', category: '', summary: '', coverImage: '' });
        navigate("/allJobs"); // Redirect to all jobs page
      } else {
        toast.error("Failed to add job.");
      }
    } catch (err) {
      toast.error("An error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="block font-semibold mb-1">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 h-32"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-semibold mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
