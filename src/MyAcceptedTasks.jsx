import React, { useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";
import { toast } from "react-hot-toast";

const MyAcceptedTasks = () => {
  const { user, loading } = useAuthContext();
  const [jobs, setJobs] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Fetch accepted jobs
  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      if (!user) return;
      try {
        setFetching(true);
        const res = await fetch(`https://freelance-server-six.vercel.app/jobs?acceptedBy=${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load accepted jobs");
      } finally {
        setFetching(false);
      }
    };
    fetchAcceptedJobs();
  }, [user]);

  if (loading || fetching) return <p className="text-center mt-10">Loading...</p>;

  if (!jobs.length) return <p className="text-center mt-10">No accepted tasks yet.</p>;

  // DONE / CANCEL
  const handleDoneOrCancel = async (jobId, action) => {
    try {
      // Optimistic UI
      setJobs(prev => prev.filter(job => job._id !== jobId));

      if (action === "cancel") {
        // Clear acceptedBy
        await fetch(`https://freelance-server-six.vercel.app/jobs/${jobId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ acceptedBy: null }),
        });
      } else if (action === "done") {
        // Remove job entirely (optional)
        await fetch(`https://freelance-server-six.vercel.app/jobs/${jobId}`, { method: "DELETE" });
      }

      toast.success(action === "done" ? "Job marked done" : "Job cancelled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-6">My Accepted Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job._id} className="bg-white shadow-md p-4 rounded-lg border relative">
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-1"><strong>Category:</strong> {job.category}</p>
            <p className="text-gray-600 mb-1"><strong>Posted By:</strong> {job.postedBy}</p>
            <p className="text-gray-700 mb-3">{job.summary.slice(0, 100)}...</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleDoneOrCancel(job._id, "done")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                ✅ Done
              </button>
              <button
                onClick={() => handleDoneOrCancel(job._id, "cancel")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAcceptedTasks;

