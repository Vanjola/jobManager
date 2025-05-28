import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import Login from "./components/Login";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAdmin(!!token);
  }, []);

  return (
    <div data-theme="caramellatte" className="min-h-screen bg-base-200 p-10">
      <div className="flex justify-end px-10 pt-6">
        <div className="w-full max-w-xs">
          <Login />
        </div>
      </div>

      <JobList isAdmin={isAdmin} />
    </div>
  );
}

export default App;
