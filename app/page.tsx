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
    <main
      style={{
        padding: 20,
        maxWidth: 800,
        margin: "0 auto",
        background: "#ffffff",
        color: "#000000",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Schools List
      </h1>

      {/* School Add Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "40px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          background: "#f9f9f9",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Add New School
        </h2>
        <input
          type="text"
          placeholder="School Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#000000",
          }}
        />
        <input
          type="number"
          placeholder="Address Id"
          value={addressId}
          onChange={(e) => setAddressId(Number(e.target.value))}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#000000",
          }}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#000000",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#000000",
          }}
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
            fontWeight: "bold",
          }}
        >
          ➕ Add School
        </button>
      </form>

      {/* School List Table */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table
            className="table table-bordered"
            style={{ background: "#ffffff", color: "#000000" }}
          >
            <thead style={{ fontWeight: "bold" }}>
              <tr>
                <th>#</th>
                <th>School Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((s: any, index: number) => (
                <tr key={s.Id}>
                  <td>{index + 1}</td>
                  <td>{s.Name}</td>
                  <td>{s.AddressLocation}</td>
                  <td>{s.ContactNumber ?? "N/A"}</td>
                  <td>{s.Email ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
