import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/counter`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const send = (action) =>
    fetch(`${API_URL}/api/${action}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch((err) => setError(err.message));

  if (loading) return <p style={wrap}>Loading...</p>;
  if (error) return <p style={wrap}>Error: {error}</p>;

  return (
    <div style={wrap}>
      <h1>Counter</h1>
      <h2 style={{ fontSize: "3rem" }}>{count}</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={btn} onClick={() => send("decrement")}>-</button>
        <button style={btn} onClick={() => send("reset")}>Reset</button>
        <button style={btn} onClick={() => send("increment")}>+</button>
      </div>
    </div>
  );
}

const wrap = {
  fontFamily: "sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "80px"
};

const btn = {
  padding: "10px 20px",
  fontSize: "1.2rem",
  cursor: "pointer"
};
