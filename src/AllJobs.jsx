import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast.success("Job deleted successfully!");
        setJobs(jobs.filter(job => job._id !== id)); // Remove from UI instantly
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Jobs</h2>

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
            {jobs.map(job => (
              <tr key={job._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={job.coverImage}
                    alt="job"
                    className="w-16 h-16 rounded object-cover border"
                  />
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
                <td colSpan="6" className="text-center py-6">
                  No jobs posted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobs;

