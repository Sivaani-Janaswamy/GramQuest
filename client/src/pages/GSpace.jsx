import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GspaceCard from "../components/GspaceCard";
import SearchBar from "../components/SearchBar";
import { PlusCircle } from "lucide-react";

export default function GSpace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [gspaces, setGspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGspaces = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized access. Please log in.");
        navigate("/login"); // optional: auto-redirect
        return;
      }

      try {
        const response = await axios.get("/api/gspaces", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGspaces(response.data);
      } catch (err) {
        console.error("Failed to fetch gspaces:", err);
        if (err.response && err.response.status === 401) {
          setError("Session expired. Please log in again.");
          navigate("/login"); // optional: auto-redirect
        } else {
          setError("Failed to load GSpaces.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGspaces();
  }, [navigate]);

  const filtered = gspaces.filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-10">Loading GSpaces...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-0 py-0">
      <div className="relative w-full text-center z-10 py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-300 via-lime-300 to-teal-300 opacity-30 animate-pulse"></div>
        <h1 className="text-4xl font-extrabold text-[#001A6E] mb-3 relative z-20">
          Discover GSpaces
        </h1>
        <p className="text-md text-[#074799] max-w-2xl mx-auto relative z-20">
          Connect with others who share your passion. Create or join a GSpace to
          showcase your talent, research, or ideas!
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-5 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-4xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a GSpace..."
            aria-label="Search GSpaces"
          />
          <button
            type="button"
            onClick={() => navigate("/gspace/create")}
            className="relative inline-flex items-center justify-center p-1.5 overflow-hidden text-sm font-semibold text-gray-900 rounded-full group bg-gradient-to-br from-[#009990] to-[#E1FFBB] group-hover:from-[#00b3b3] group-hover:to-[#f0ffc2] focus:ring-4 focus:outline-none focus:ring-lime-200"
            aria-label="Create a new GSpace"
          >
            <span className="relative px-6 py-2.5 transition-all ease-in duration-100 bg-white text-cyan-50 dark:bg-gray-900 rounded-full group-hover:bg-transparent whitespace-nowrap">
              <PlusCircle className="inline-block w-5 h-5 mr-2" />
              Create a GSpace
            </span>
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="text-2xl text-[#001A6E] font-semibold mb-3">
              No GSpaces Found
            </h2>
            <p className="text-[#009990]">
              Start building your own interest-based community today.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 9).map((space, index) => (
              <GspaceCard
                key={space.id || index} // <-- Fixes missing key warning
                {...space}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
