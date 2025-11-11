import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then(res => res.json())
      .then(data => setJobs(data.slice(0, 6))); // Get latest 6
  }, []);

  // DELETE HANDLER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast.success("Job deleted successfully!");
        setJobs(jobs.filter(job => job._id !== id)); // Remove from UI
      } else {
        toast.error("Failed to delete job.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-6 shadow rounded-lg hover:scale-105 duration-300 text-center">
            <img src={job.coverImage} alt={job.title} className="h-40 w-full object-cover rounded-md" />

            <h3 className="text-xl font-semibold mt-3">{job.title}</h3>
            <p className="text-sm text-gray-600">Posted By: {job.postedBy}</p>
            <p className="text-sm font-medium text-purple-600">{job.category}</p>

            <p className="mt-2 text-gray-700 text-sm">{job.summary.slice(0, 80)}...</p>

            <div className="mt-4 flex flex-col gap-2">
              <Link to={`/allJobs/${job._id}`}>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Details
                </button>
              </Link>

              <button
                onClick={() => handleDelete(job._id)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <p className="col-span-3 text-center text-gray-600 text-lg">
            No jobs available yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;

