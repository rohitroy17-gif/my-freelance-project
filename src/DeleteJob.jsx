import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteJob = () => {
  const { id } = useParams(); // get job id from URL
  const navigate = useNavigate();

  useEffect(() => {
    const deleteJob = async () => {
      const confirm = window.confirm("Are you sure you want to delete this job?");
      if (!confirm) {
        navigate(-1); // go back if user cancels
        return;
      }

      try {
        const res = await axios.delete(`https://freelance-server-six.vercel.app/jobs/${id}`);
        if (res.status === 200) {
          toast.success("Job deleted successfully!");
          navigate("/my-added-jobs"); // redirect after deletion
        } else {
          toast.error("Failed to delete job.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while deleting the job.");
      }
    };

    deleteJob();
  }, [id, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">Deleting job...</p>
    </div>
  );
};

export default DeleteJob;
