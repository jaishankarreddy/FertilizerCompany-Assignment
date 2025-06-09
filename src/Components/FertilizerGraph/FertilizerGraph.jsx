import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Expects data: [{ xKey, yKey1, yKey2, ... }], e.g. [{ month: 'Jan', requirement: 100, availability: 80 }, ...]
export default function FertilizerGraph({ data, xKey, yKey1, yKey2, title }) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yKey1} stroke="#8884d8" name="Requirement" />
          <Line type="monotone" dataKey={yKey2} stroke="#82ca9d" name="Availability" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
