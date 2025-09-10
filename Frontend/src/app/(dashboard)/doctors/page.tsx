"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
      id
      name
      specialization
    }
  }
`;

export default function DoctorsPage() {
  const { data, loading, error } = useQuery(GET_DOCTORS);
  const [search, setSearch] = useState("");

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const filteredDoctors = data?.doctors?.filter((doc: any) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">All Doctors</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ul className="space-y-4">
        {filteredDoctors.length == 0 ? (
          <p className="text-gray-500 italic">No doctors found.</p>
        ) : (
          filteredDoctors.map((doc: any) => (
            <li
              key={doc.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-semibold text-lg">{doc.name}</p>
              <p className="text-gray-600">
                <span className="font-medium">Specialization:</span>{" "}
                {doc.specialization}
              </p>
            </li>
            
          ))
        )}
      </ul>
    </div>
  );
}