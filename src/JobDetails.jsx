import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const userEmail = "user@example.com"; // Replace with logged-in user's email

  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data));
  }, [id]);

  const handleAccept = () => {
    fetch(`http://localhost:3000/jobs/accept/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail })
    })
      .then(res => res.json())
      .then(() => alert("Job accepted!"))
      .catch(err => console.error(err));
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <img src={job.coverImage} alt={job.title} className="w-full h-60 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.category}</p>
      <p className="mt-4">{job.summary}</p>
      <p className="mt-2 text-sm text-gray-500">Posted by: {job.postedBy}</p>
      <button
        onClick={handleAccept}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Accept
      </button>
    </div>
  );
};

export default JobDetails;
