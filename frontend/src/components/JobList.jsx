import React, { useState, useEffect } from "react";
import api from "../api/axios";
import Job from "./Job";
import JobForm from "./JobForm";

const JobList = ({ isAdmin }) => {
  const [jobs, setJobs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    api
      .get("/api/jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error("Greška:", err);
      });
  }, []);

  const handleDelete = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleDone = (id, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, is_completed: newStatus } : job
      )
    );
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleJobEdited = (editedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === editedJob.id ? editedJob : job))
    );
  };
  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="relative flex items-center mb-4 min-h-[52px]">
        {isAdmin && (
          <button
            className="btn btn-primary absolute left-0"
            onClick={() => setShowAddForm(true)}
          >
            Dodaj novi posao
          </button>
        )}
        <h2 className="text-3xl font-bold flex-1 text-center m-0">Poslovi</h2>
      </div>

      {showAddForm && (
        <JobForm
          onClose={() => setShowAddForm(false)}
          onJobAdded={handleJobAdded}
        />
      )}
      {editJob && (
        <JobForm
          job={editJob}
          onClose={() => setEditJob(null)}
          onJobEdited={handleJobEdited}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {jobs.map((job) => (
          <Job
            key={job.id}
            job={job}
            isAdmin={isAdmin}
            onDelete={handleDelete}
            onDone={handleDone}
            onEdit={(job) => setEditJob(job)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
