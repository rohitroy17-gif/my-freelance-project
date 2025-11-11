import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuthContext } from "./AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setJobLoading(true);
        const res = await fetch(`http://localhost:3000/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        toast.error("Could not load job details");
      } finally {
        setJobLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleAccept = async () => {
    if (!user) return toast.error("You must be logged in");

    try {
      const res = await fetch(`http://localhost:3000/jobs/accept/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      });

      if (res.status === 403) {
        return toast.error("You cannot accept your own job!");
      }

      if (res.ok) {
        toast.success("Job accepted successfully!");
        setJob({ ...job, acceptedUsers: [...(job.acceptedUsers || []), user.email] });
      }
    } catch (err) {
      toast.error("Error accepting job");
    }
  };

  if (loading || jobLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  const isOwner = job.userEmail === user?.email;
  const alreadyAccepted = job.acceptedUsers?.includes(user.email);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <ToastContainer position="top-right" autoClose={1500} />

      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <img src={job.coverImage} alt={job.title} className="w-full h-64 object-cover rounded-lg mb-6 border" />

      <p><strong>Category:</strong> {job.category}</p>
      <p><strong>Posted By:</strong> {job.postedBy}</p>
      <p><strong>Summary:</strong> {job.summary}</p>
      <p><strong>Accepted By:</strong> {job.acceptedUsers?.length || 0}</p>

      {isOwner && (
        <p className="mt-4 text-red-600 font-semibold">
          You cannot accept your own job.
        </p>
      )}

      {!isOwner && !alreadyAccepted && (
        <button
          onClick={handleAccept}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Accept Job
        </button>
      )}

      {alreadyAccepted && !isOwner && (
        <p className="mt-4 font-semibold text-green-600">You have already accepted this job</p>
      )}
    </div>
  );
};

export default JobDetails;






