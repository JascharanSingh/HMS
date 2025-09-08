// src/app/(dashboard)/doctors/page.tsx
import { gql } from "@apollo/client";
import { query } from "@/lib/apollo-client"; // you exported `query` from apollo-client.ts

// Define GraphQL query
const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
      id
      name
      specialization
    }
  }
`;

export default async function DoctorsPage() {
  const { data } = await query({ query: GET_DOCTORS });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Doctors</h1>
      <ul className="space-y-2">
        {data.doctors.map((doc: any) => (
          <li key={doc.id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {doc.name}</p>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}