
import { gql } from "@apollo/client";
import { query } from "@/lib/apollo-client";

// Define GraphQL query
const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      first_name
      last_name
      medical_history
      address
      
    }
  }
`;

export default async function PatientsPage() {
  const { data } = await query({ query: GET_PATIENTS });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Patients</h1>
      <ul className="space-y-2">
        {data.patients.map((patient: any) => (
          <li key={patient.id} className="border p-4 rounded shadow">
            <p>
              <strong>Name:</strong> {patient.first_name} {patient.last_name}
            </p>
            <p>
              <strong>Adress:</strong> {patient.address}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}

            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
