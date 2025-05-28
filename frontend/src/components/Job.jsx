import api from "../api/axios";

const Job = ({ job, isAdmin, onDone, onDelete, onEdit }) => {
  const token = sessionStorage.getItem("token");
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      onDelete(id);
    } catch (err) {
      console.error("Greška pri brisanju:", err);
    }
  };

  const handleToggleDone = async (id, newStatus) => {
    try {
      await api.put(
        `/api/jobs/${id}`,
        { is_completed: newStatus },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      onDone(id, newStatus); // Pozivamo iz parent komponente
    } catch (err) {
      console.error("Greška pri ažuriranju statusa:", err);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md w-full max-w-md">
      <div className="card-body p-3 text-sm space-y-1">
        <h3 className="card-title text-2xl">{job.title}</h3>
        <p className="text-lg text-gray-700">Lokacija 📍 {job.location}</p>
        <p className="text-lg text-gray-700">Datum 📅 {job.date}</p>

        {job.is_completed && (
          <span className="badge badge-success w-fit my-2">Završeno</span>
        )}

        {job.note && (
          <p className="text-lg text-gray-700">Dodatne info📝 {job.note}</p>
        )}

        {isAdmin && job.material_cost !== undefined && (
          <div className="bg-base-200 p-4 rounded-lg mt-4 space-y-2 text-lg">
            <p>
              📦 Materijal: <strong>€{job.material_cost}</strong>
            </p>
            <p>
              ➕ Dodatni troškovi: <strong>€{job.additional_cost}</strong>
            </p>
            <p>
              💸 Naplaćeno: <strong>€{job.revenue}</strong>
            </p>

            <p className="text-xl mt-2">
              🧮 Zarada:{" "}
              <span className="font-bold text-green-600">
                €{job.revenue - job.material_cost - job.additional_cost}
              </span>
            </p>
          </div>
        )}

        <div className="card-actions justify-end mt-4"></div>
      </div>
      {isAdmin && (
        <div className="card-actions justify-end flex gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            checked={job.is_completed}
            onChange={(e) => handleToggleDone(job.id, e.target.checked)}
          />
          Zavrseno
          <button
            className="btn btn-warning btn-sm"
            onClick={() => onEdit(job)}
          >
            Izmeni
          </button>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleDelete(job.id)}
          >
            Obriši
          </button>
        </div>
      )}
    </div>
  );
};

export default Job;
