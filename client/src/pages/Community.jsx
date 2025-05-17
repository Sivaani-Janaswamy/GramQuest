import { useParams } from 'react-router-dom';
import useFetchGSpace from '../hooks/useFetchGSpace';

export default function Community() {
  const { id } = useParams();
  const { gspace, loading, error } = useFetchGSpace(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-cyan-700 animate-pulse">
          Loading GSpace...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!gspace) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">No GSpace data available.</p>
      </div>
    );
  }

  const title = typeof gspace.title === "string" ? gspace.title : "Untitled";
  const description =
    typeof gspace.description === "string"
      ? gspace.description
      : JSON.stringify(gspace.description);
  const tags = Array.isArray(gspace.tags)
    ? gspace.tags.map((tag) =>
        typeof tag === "string" ? tag : tag.name || JSON.stringify(tag)
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 sm:px-10 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-[#001A6E] mb-6 border-b-2 border-[#009990] pb-2">
        {title}
      </h1>
      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line mb-8">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-lime-100 text-[#007777] px-4 py-1 rounded-full text-sm font-medium"
              title={`Tag: ${tag}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}