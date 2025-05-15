import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateGSpace() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/gspaces",
        { title, description, tags: tagsArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/gspace/${response.data.slug}`);
    } catch (err) {
      console.error("Error creating GSpace:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-[#001A6E] mb-6">Create a GSpace</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded-xl">
        <input
          type="text"
          placeholder="GSpace Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded"
          rows={5}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#009990] text-white font-semibold py-2 rounded hover:bg-[#00b3b3]"
        >
          Create GSpace
        </button>
      </form>
    </div>
  );
}
