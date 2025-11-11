import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useAuthContext } from "./AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });
  const [loadingJob, setLoadingJob] = useState(true);

  const categories = [
    "Web Development",
    "App Development",
    "Digital Marketing",
    "Graphics Designing",
    "Content Writing",
    "SEO",
  ];

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      if (!user) return;

      try {
        setLoadingJob(true);
        const res = await fetch(`https://freelance-server-six.vercel.app/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setFormData({
          title: data.title || "",
          category: data.category || "",
          summary: data.summary || "",
          coverImage: data.coverImage || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load job");
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [id, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login required");

    try {
      const res = await fetch(`https://freelance-server-six.vercel.app/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update job");

      toast.success("Job updated successfully!");
      navigate("/all-jobs"); // Redirect after update
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    }
  };

  if (loading || loadingJob) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Update Job</h1>

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
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
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

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;

