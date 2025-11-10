import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const MyAcceptedTasks = () => {
  const [jobs, setJobs] = useState([]);
  const userEmail = "user@example.com"; // Replace with logged-in user's email

  useEffect(() => {
    fetch(`http://localhost:3000/myAcceptedTasks?email=${userEmail}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  // Handle DONE - remove job completely
  const handleDone = async (jobId) => {
    try {
      const res = await fetch(`http://localhost:3000/jobs/${jobId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setJobs(prev => prev.filter(job => job._id !== jobId));
        toast.success("Job marked as done and removed!");
      }
    } catch (err) {
      toast.error("Failed to mark as done.");
      console.error(err);
    }
  };

  // Handle CANCEL - remove current user from acceptedUsers
  const handleCancel = async (jobId) => {
    try {
      const res = await fetch(`http://localhost:3000/jobs/accept/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, action: "remove" }) // indicate removal
      });
      if (res.ok) {
        setJobs(prev => prev.filter(job => job._id !== jobId));
        toast.success("Job cancelled successfully!");
      }
    } catch (err) {
      toast.error("Failed to cancel job.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">My Accepted Tasks</h1>

      {jobs.length === 0 && <p className="text-gray-600">No accepted tasks yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job._id} className="border p-4 rounded shadow bg-white relative">
            <img
              src={job.coverImage}
              alt={job.title}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.category}</p>
            <p className="mt-2 text-gray-700">{job.summary.substring(0, 80)}...</p>
            <p className="mt-1 text-sm text-gray-500">Posted by: {job.postedBy}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDone(job._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                ✅ Done
              </button>
              <button
                onClick={() => handleCancel(job._id)}
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
