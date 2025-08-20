"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [name, setName] = useState("");
  const [addressId, setAddressId] = useState<number>(1);
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  async function loadSchools() {
    setLoading(true);
    const res = await fetch("/api/schools");
    const data = await res.json();
    setSchools(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        addressId,
        contactNumber,
        email,
      }),
    });

    // reset form
    setName("");
    setAddressId(1);
    setContactNumber("");
    setEmail("");

    // reload list
    loadSchools();
  }

  useEffect(() => {
    loadSchools();
  }, []);

  return (
    <main style={{ padding: 20, maxWidth: 600 }}>
      <h1>Schools List</h1>

      {/* School Add Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h2>Add New School</h2>
        <input
          type="text"
          placeholder="School Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Address Id"
          value={addressId}
          onChange={(e) => setAddressId(Number(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          style={{
            background: "green",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ➕ Add School
        </button>
      </form>

      {/* School List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {schools.map((s: any) => (
            <li key={s.Id}>
              <b>{s.Name}</b> — {s.AddressLocation} ({s.ContactNumber ?? "N/A"})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
