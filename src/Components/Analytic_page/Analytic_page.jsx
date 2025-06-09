"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";
import "./Analytic_page.css";

export default function Analytics({ data }) {
  // Process data for monthly trends
  // Dynamically aggregate monthly fertilizer requirements from real data
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const productMap = {
    urea: ["UREA"],
    dap: ["DAP"],
    potash: ["MOP", "POTASH"],
    complex: ["NPK", "COMPLEX", "TSP", "SSP", "MAP"],
  };

  const monthlyData = monthNames.map((month) => {
    // For each product group, sum requirements for that month
    const entry = { month };
    Object.entries(productMap).forEach(([key, productNames]) => {
      entry[key] = data
        .filter(
          (item) =>
            item.month &&
            item.month
              .toLowerCase()
              .startsWith(month.toLowerCase().slice(0, 3)) &&
            productNames.includes(item.product?.toUpperCase())
        )
        .reduce((sum, item) => sum + (Number(item.requirement_in_mt_) || 0), 0);
    });
    return entry;
  });

  // Process data for availability vs requirement comparison
  const comparisonData = data.slice(0, 10).map((item) => ({
    name: item.product,
    availability: Number(item.availability_in_mt_) || 0,
    requirement: Number(item.requirement_in_mt_) || 0,
    state: item.state,
  }));

  const fertilizerOptions = Array.from(new Set(data.map((item) => item.product))).sort();
  const yearOptions = Array.from(new Set(data.map((item) => item._year))).sort();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0] || "");
  const [selectedFertilizer, setSelectedFertilizer] = useState(fertilizerOptions[0] || "");

  // Prepare monthly trend for selected fertilizer and year
  const filteredYearFertilizerData = data.filter(
    (item) =>
      item.product === selectedFertilizer &&
      item._year === selectedYear
  );
  const fertilizerMonthlyTrend = monthNames.map((month) => {
    const monthData = filteredYearFertilizerData.filter(
      (item) =>
        item.month &&
        item.month.toLowerCase().startsWith(month.toLowerCase().slice(0, 3))
    );
    return {
      month,
      requirement: monthData.reduce(
        (sum, item) => sum + (Number(item.requirement_in_mt_) || 0),
        0
      ),
      availability: monthData.reduce(
        (sum, item) => sum + (Number(item.availability_in_mt_) || 0),
        0
      ),
    };
  });

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Fertilizer Analytics Dashboard</h2>
        <p>Comprehensive insights into fertilizer supply and demand patterns</p>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <h3>Yearly Trend for Selected Fertilizer</h3>
          <p>Monthly availability and requirement for any fertilizer and year</p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <label>
              Year:
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ marginLeft: 4, padding: 4 }}
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fertilizer:
              <select
                value={selectedFertilizer}
                onChange={(e) => setSelectedFertilizer(e.target.value)}
                style={{ marginLeft: 4, padding: 4 }}
              >
                {fertilizerOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={fertilizerMonthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${value}MT`}
              />
              <Tooltip formatter={(value) => [`${value} MT`, ""]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="requirement"
                stroke="#2563eb"
                strokeWidth={3}
                name="Requirement"
                dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="availability"
                stroke="#059669"
                strokeWidth={3}
                name="Availability"
                dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Monthly Fertilizer Requirements Trend</h3>
            <p>Seasonal demand patterns across different fertilizer types</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}MT`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [`${value} MT`, ""]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="urea"
                  stroke="#2563eb"
                  strokeWidth={3}
                  name="Urea"
                  dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="dap"
                  stroke="#dc2626"
                  strokeWidth={3}
                  name="DAP"
                  dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="potash"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Potash"
                  dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="complex"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  name="Complex"
                  dot={{ fill: "#7c3aed", strokeWidth: 2, r: 4 }}
                />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

       
      </div>
    </div>
  );
}
