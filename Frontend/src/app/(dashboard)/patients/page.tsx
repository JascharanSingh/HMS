"use client";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState, useMemo, useEffect } from "react";


// --- Queries ---
const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      first_name
      last_name
      address
      gender
      medical_history
    }
  }
`;

// --- Mutation ---
const UPDATE_PATIENT_HISTORY = gql`
  mutation UpdatePatientHistory($id: Int!, $medical_history: JSON!) {
    updatePatientMedicalHistory(id: $id, medical_history: $medical_history) {
      id
      medical_history
    }
  }
`;

export default function PatientsPage() {
  const { data, loading, error, refetch } = useQuery(GET_PATIENTS);
  const [updatePatientHistory] = useMutation(UPDATE_PATIENT_HISTORY);

  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [medicalHistory, setMedicalHistory] = useState<any>(null);
  const [search, setSearch] = useState("");

  // sync medicalHistory when selecting patient
  useEffect(() => {
    if (selectedPatient) {
      setMedicalHistory(selectedPatient.medical_history || {});
    }
  }, [selectedPatient]);

  const filteredPatients = useMemo(() => {
    if (!data?.patients) return [];
    return data.patients.filter((p: any) =>
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (loading) return <p className="p-6">Loading patients...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  // --- Helper: persist update ---
  const saveUpdate = async (updated: any) => {
    setMedicalHistory(updated);

    await updatePatientHistory({
      variables: { id: Number(selectedPatient.id), medical_history: updated },
    });

    // refetch all patients
    const refreshed = await refetch();

    // reselect this patient with latest data
    const newPatient = refreshed.data.patients.find(
      (p: any) => p.id === selectedPatient.id
    );
    setSelectedPatient(newPatient);
  };

  // --- Surgeries ---
  const addSurgery = async () => {
    const value = prompt("Enter surgery:");
    if (!value) return;

    const updated = {
      ...medicalHistory,
      surgeries: [...(medicalHistory?.surgeries || []), value],
    };
    await saveUpdate(updated);
  };

  const editSurgery = async (index: number) => {
    const value = prompt("Update surgery:", medicalHistory.surgeries[index]);
    if (!value) return;

    const updated = {
      ...medicalHistory,
      surgeries: medicalHistory.surgeries.map((s: string, i: number) =>
        i === index ? value : s
      ),
    };
    await saveUpdate(updated);
  };

  const removeSurgery = async (index: number) => {
    const updated = {
      ...medicalHistory,
      surgeries: medicalHistory.surgeries.filter((_: any, i: number) => i !== index),
    };
    await saveUpdate(updated);
  };

  // --- Medications ---
  const addMedication = async () => {
    const name = prompt("Medication name:");
    if (!name) return;
    const dose = prompt("Dose (e.g. 500mg):") || "";
    const frequency = prompt("Frequency (e.g. twice daily):") || "";

    const updated = {
      ...medicalHistory,
      medications: [
        ...(medicalHistory?.medications || []),
        { name, dose, frequency, start_date: new Date().toISOString().slice(0, 10) },
      ],
    };
    await saveUpdate(updated);
  };

  const editMedication = async (index: number) => {
    const med = medicalHistory.medications[index];
    const name = prompt("Update name:", med.name);
    if (!name) return;

    const updated = {
      ...medicalHistory,
      medications: medicalHistory.medications.map((m: any, i: number) =>
        i === index ? { ...m, name } : m
      ),
    };
    await saveUpdate(updated);
  };

  const removeMedication = async (index: number) => {
    const updated = {
      ...medicalHistory,
      medications: medicalHistory.medications.filter((_: any, i: number) => i !== index),
    };
    await saveUpdate(updated);
  };

  // --- Allergies ---
  const addAllergy = async (type: "foods" | "medications" | "environmental") => {
    const value = prompt(`Enter ${type} allergy:`);
    if (!value) return;

    const updated = {
      ...medicalHistory,
      allergies: {
        ...medicalHistory.allergies,
        [type]: [...(medicalHistory?.allergies?.[type] || []), value],
      },
    };
    await saveUpdate(updated);
  };

  // --- Doctor Notes ---
  const addNote = async () => {
    const note = prompt("Enter note:");
    if (!note) return;

    const updated = {
      ...medicalHistory,
      doctor_notes: [
        ...(medicalHistory?.doctor_notes || []),
        { date: new Date().toISOString().slice(0, 10), note, author: "Dr. Jascharan Singh" },
      ],
    };
    await saveUpdate(updated);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Patient Portal</h1>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search patients by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6">
        {/* Patient List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {filteredPatients.map((patient: any) => (
            <div
              key={patient.id}
              className={`border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition cursor-pointer ${
                selectedPatient?.id === patient.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedPatient(patient)}
            >
              <h2 className="text-lg font-semibold">
                {patient.first_name} {patient.last_name}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Address:</span>{" "}
                {patient.address || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Gender:</span>{" "}
                {patient.gender || "N/A"}
              </p>
              <button className="mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                View Medical Info
              </button>
            </div>
          ))}
        </div>

        {/* Patient Details */}
        <div className="border rounded-lg shadow-md p-6 bg-white min-h-[400px]">
          {selectedPatient ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {selectedPatient.first_name} {selectedPatient.last_name}
              </h2>

              {/* Surgeries */}
              <div>
                <h3 className="font-semibold mb-2">Surgeries</h3>
                <ul className="list-disc pl-6 mb-2">
                  {medicalHistory?.surgeries?.length > 0 ? (
                    medicalHistory.surgeries.map((s: string, i: number) => (
                      <li key={i} className="flex justify-between items-center">
                        {s}
                        <div className="space-x-2">
                          <button onClick={() => editSurgery(i)} className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">Edit</button>
                          <button onClick={() => removeSurgery(i)} className="px-2 py-1 bg-red-500 text-white text-xs rounded">Remove</button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="italic text-gray-500">None</li>
                  )}
                </ul>
                <button onClick={addSurgery} className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded">Add Surgery</button>
              </div>

              <hr className="my-4" />

              {/* Medications */}
              <div>
                <h3 className="font-semibold mb-2">Medications</h3>
                <ul className="list-disc pl-6 mb-2">
                  {medicalHistory?.medications?.length > 0 ? (
                    medicalHistory.medications.map((m: any, i: number) => (
                      <li key={i} className="flex justify-between items-center">
                        {typeof m === "string" ? m : `${m.name} (${m.dose}, ${m.frequency})`}
                        <div className="space-x-2">
                          <button onClick={() => editMedication(i)} className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">Edit</button>
                          <button onClick={() => removeMedication(i)} className="px-2 py-1 bg-red-500 text-white text-xs rounded">Remove</button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="italic text-gray-500">None</li>
                  )}
                </ul>
                <button onClick={addMedication} className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded">Add Medication</button>
              </div>

              <hr className="my-4" />

              {/* Allergies */}
              <div>
                <h3 className="font-semibold mb-2">Allergies</h3>
                <ul className="list-disc pl-6 mb-2">
                  {medicalHistory?.allergies?.foods?.length > 0 && <li>Foods: {medicalHistory.allergies.foods.join(", ")}</li>}
                  {medicalHistory?.allergies?.medications?.length > 0 && <li>Medications: {medicalHistory.allergies.medications.join(", ")}</li>}
                  {medicalHistory?.allergies?.environmental?.length > 0 && <li>Environmental: {medicalHistory.allergies.environmental.join(", ")}</li>}
                </ul>
                <button onClick={() => addAllergy("foods")} className="px-2 py-1 bg-green-500 text-white text-xs rounded mr-2">Add Food Allergy</button>
                <button onClick={() => addAllergy("medications")} className="px-2 py-1 bg-green-500 text-white text-xs rounded mr-2">Add Medication Allergy</button>
                <button onClick={() => addAllergy("environmental")} className="px-2 py-1 bg-green-500 text-white text-xs rounded">Add Environmental Allergy</button>
              </div>

              <hr className="my-4" />

              {/* Doctor Notes */}
              <div>
                <h3 className="font-semibold mb-2">Doctor Notes</h3>
                {medicalHistory?.doctor_notes?.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {medicalHistory.doctor_notes.map((n: any, i: number) => (
                      <li key={i}>{n.date} - {n.note} <span className="text-gray-500">({n.author})</span></li>
                    ))}
                  </ul>
                ) : (
                  <p className="italic text-gray-500">No notes</p>
                )}
                <button onClick={addNote} className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded">Add Note</button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 italic">Select a patient to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}