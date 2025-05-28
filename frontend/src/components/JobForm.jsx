import React, { useState, useEffect } from "react";
import api from "../api/axios";

const JobForm = ({ onClose, onJobAdded, onJobEdited, job }) => {
  // State za sva polja (dodaj ostala po potrebi)
  const [title, setTitle] = useState(job?.title || "");
  const [location, setLocation] = useState(job?.location || "");
  const [date, setDate] = useState(job?.date || "");
  const [materialCost, setMaterialCost] = useState(job?.material_cost ?? "");
  const [additionalCost, setAdditionalCost] = useState(
    job?.additionalCost || ""
  );
  const [revenue, setRevenue] = useState(job?.revenue || "");
  const [note, setNote] = useState(job?.note || "");

  useEffect(() => {
    if (job) {
      setTitle(job.title || "");
      setLocation(job.location || "");
      setDate(job.date || "");
      setMaterialCost(job.material_cost ?? "");
      setAdditionalCost(job.additional_cost ?? "");
      setRevenue(job.revenue ?? "");
      setNote(job.note || "");
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (job) {
        // Izmena posla
        const res = await api.put(
          `/api/jobs/${job.id}`,
          {
            title,
            location,
            material_cost: parseFloat(materialCost),
            additional_cost: parseFloat(additionalCost),
            revenue: parseFloat(revenue),
            note,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        onJobEdited && onJobEdited(res.data);
      } else {
        // Dodavanje posla
        const res = await api.post(
          "/api/jobs",
          {
            title,
            location,
            material_cost: parseFloat(materialCost),
            additional_cost: parseFloat(additionalCost),
            revenue: parseFloat(revenue),
            note,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        onJobAdded && onJobAdded(res.data);
      }
      window.location.reload();
      onClose();
    } catch (err) {
      alert("Greška prilikom snimanja posla!");
      console.error(err);
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Dodaj novi posao</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Naziv posla"
          className="input input-bordered"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lokacija"
          className="input input-bordered"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          className="input input-bordered"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Trošak materijala (€)"
          className="input input-bordered"
          value={materialCost}
          onChange={(e) => setMaterialCost(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Dodatni troškovi (€)"
          className="input input-bordered"
          value={additionalCost}
          onChange={(e) => setAdditionalCost(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Naplaćeno (€)"
          className="input input-bordered"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          required
        />
        <textarea
          placeholder="Beleška (opciono)"
          className="textarea textarea-bordered"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex gap-2 justify-end mt-4">
          <button type="submit" className="btn btn-primary">
            Sačuvaj
          </button>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Otkaži
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
