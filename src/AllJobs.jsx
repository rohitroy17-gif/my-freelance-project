import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");

  // Fetch Jobs
  useEffect(() => {
    fetch("https://freelance-server-six.vercel.app/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  // Sorting logic
  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = new Date(a.postedAt);
    const dateB = new Date(b.postedAt);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://freelance-server-six.vercel.app/jobs/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast.success("Job deleted!");
        setJobs(jobs.filter(job => job._id !== id));
      }
    } catch (err) {
      toast.error("Error deleting job");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Jobs</h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className="border px-3 py-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Posted By</th>
              <th className="py-3 px-4">Summary</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedJobs.map(job => (
              <tr key={job._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={job.coverImage} className="w-16 h-16 object-cover rounded border" />
                </td>
                <td className="py-3 px-4 font-medium">{job.title}</td>
                <td className="py-3 px-4">{job.category}</td>
                <td className="py-3 px-4">{job.postedBy}</td>
                <td className="py-3 px-4">{job.summary?.slice(0, 40)}...</td>

                <td className="py-3 px-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <Link to={`/allJobs/${job._id}`}>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        View Details
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {jobs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">No jobs found.</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllJobs;


