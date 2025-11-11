import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useAuthContext } from "./AuthProvider";
import { toast } from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuthContext(); // logged-in user
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setJobLoading(true);
        const res = await fetch(`http://localhost:3000/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job details");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load job details");
      } finally {
        setJobLoading(false);
      }
    };
    if (user) fetchJob(); // fetch only if user exists
  }, [id, user]);

  // Accept Job
  const handleAccept = async () => {
    if (!user) return toast.error("Login required");
    try {
      setAccepting(true);

      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acceptedBy: user.email }),
      });

      if (!res.ok) throw new Error("Failed to accept job");

      // Update job state
      setJob(prev => ({ ...prev, acceptedBy: user.email }));
      toast.success("Job accepted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept job");
    } finally {
      setAccepting(false);
    }
  };

  if (loading || jobLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
      <img
        src={job.coverImage}
        alt={job.title}
        className="w-full h-72 object-cover rounded-lg mb-6 border"
      />
      <div className="space-y-3 text-gray-700">
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Posted By:</strong> {job.postedBy}</p>
        <p><strong>Summary:</strong> {job.summary}</p>
        <p><strong>Accepted By:</strong> {job.acceptedBy || "Not yet accepted"}</p>
      </div>

      {/* SHOW Accept button only if logged-in user hasn't accepted yet */}
      {user && job.acceptedBy !== user.email && (
        <button
          onClick={handleAccept}
          disabled={accepting}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {accepting ? "Accepting..." : "Accept Job"}
        </button>
      )}

      {/* Inform user if already accepted */}
      {user && job.acceptedBy === user.email && (
        <span className="mt-6 px-4 py-2 bg-gray-300 rounded text-white inline-block">
          You have accepted this job ✅
        </span>
      )}
    </div>
  );
};

export default JobDetails;



