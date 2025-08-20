"use client";

import { useEffect, useState } from "react";

interface Address {
  Id: number;
  Location: string;
}

interface School {
  Id: number;
  Name: string;
  AddressLocation: string;
  ContactNumber: string;
  Email: string;
}

export default function SchoolPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [addressId, setAddressId] = useState<number | "">("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadSchools();
    loadAddresses();
  }, []);

  async function loadSchools() {
    setLoading(true);
    const res = await fetch("/api/schools");
    const data = await res.json();
    setSchools(data);
    setLoading(false);
  }

  async function loadAddresses() {
    const res = await fetch("/api/addresses");
    const data = await res.json();
    setAddresses(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!addressId) return alert("Please select an address");

    await fetch("/api/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        addressId,
        contactNumber: contact,
        email,
      }),
    });

    setName("");
    setAddressId("");
    setContact("");
    setEmail("");
    loadSchools();
  }

  function handleClear() {
    setName("");
    setAddressId("");
    setContact("");
    setEmail("");
  }

  return (
    <div style={{ padding: 20, minHeight: "100vh", background: "#f8f9fa" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Schools</h1>

      {/* Form Card */}
      <div style={{ background: "#fff", padding: 20, borderRadius: 8, marginBottom: 30, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 15, alignItems: "center" }}>
          <input
            type="text"
            placeholder="School Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ flex: "1 1 200px", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />

          <select
            value={addressId}
            onChange={(e) => setAddressId(Number(e.target.value))}
            required
            style={{ flex: "1 1 200px", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          >
            <option value="">Select Address</option>
            {addresses.map((addr) => (
              <option key={addr.Id} value={addr.Id}>
                {addr.Location}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{ flex: "1 1 150px", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: "1 1 200px", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" style={{ background: "green", color: "#fff", padding: "10px 20px", border: "none", borderRadius: 5 }}>
              Save
            </button>
            <button type="button" onClick={handleClear} style={{ background: "red", color: "#fff", padding: "10px 20px", border: "none", borderRadius: 5 }}>
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Schools Table */}
      <div style={{ overflowX: "auto" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
            <thead style={{ background: "#e9ecef" }}>
              <tr>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>#</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Name</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Address</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Contact</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((s, idx) => (
                <tr key={s.Id}>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{idx + 1}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{s.Name}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{s.AddressLocation}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{s.ContactNumber ?? "N/A"}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{s.Email ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
