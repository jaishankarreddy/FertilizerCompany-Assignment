"use client";

import React from "react";
import { data } from "../../data/data"; // adjust path if needed
import "./TopFertilizers.css";

export default function TopFertilizers() {
  // Prepare data: map original fields to simpler names and convert strings to numbers
  const processedData = data.map(item => ({
    name: item.product,
    state: item.state,
    requirement: Number(item.requirement_in_mt_) || 0,
    availability: Number(item.availability_in_mt_) || 0,
    // price: Number(item.price) || 0, // uncomment if price exists
  }));

  // Calculate top 5 most required fertilizers
  const topRequired = [...processedData]
    .sort((a, b) => b.requirement - a.requirement)
    .slice(0, 5);

  // Calculate top 5 least available fertilizers
  const leastAvailable = [...processedData]
    .sort((a, b) => a.availability - b.availability)
    .slice(0, 5);

  // Summary stats
  const totalAvailability = processedData.reduce((sum, item) => sum + item.availability, 0);
  const totalRequirement = processedData.reduce((sum, item) => sum + item.requirement, 0);
  const overallGap = totalRequirement - totalAvailability;

  // If price data exists and you want average price, uncomment below
  // const averagePrice = processedData.reduce((sum, item) => sum + item.price, 0) / processedData.length || 0;

  return (
    <div className="top-fertilizers-container">

      {/* Top Lists */}
      <div className="top-lists">
        <div className="top-list-card">
          <div className="list-header">
            <h3>🔥 Top 5 Most Required Fertilizers</h3>
            <p>Fertilizers with highest demand across states</p>
          </div>
          <div className="fertilizer-list">
            {topRequired.map((fertilizer, index) => (
              <div key={index} className="fertilizer-item">
                <div className="fertilizer-rank">#{index + 1}</div>
                <div className="fertilizer-info">
                  <div className="fertilizer-name">{fertilizer.name}</div>
                  <div className="fertilizer-state">{fertilizer.state}</div>
                </div>
                <div className="fertilizer-stats">
                  <div className="stat-value">{fertilizer.requirement.toLocaleString()} MT</div>
                  <div className="stat-label">Required</div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill required"
                    style={{
                      width: `${(fertilizer.requirement / topRequired[0].requirement) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="top-list-card">
          <div className="list-header">
            <h3>⚠️ Top 5 Least Available Fertilizers</h3>
            <p>Fertilizers with lowest stock levels - urgent attention needed</p>
          </div>
          <div className="fertilizer-list">
            {leastAvailable.map((fertilizer, index) => (
              <div key={index} className="fertilizer-item">
                <div className="fertilizer-rank critical">#{index + 1}</div>
                <div className="fertilizer-info">
                  <div className="fertilizer-name">{fertilizer.name}</div>
                  <div className="fertilizer-state">{fertilizer.state}</div>
                </div>
                <div className="fertilizer-stats">
                  <div className="stat-value">{fertilizer.availability.toLocaleString()} MT</div>
                  <div className="stat-label">Available</div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill available"
                    style={{
                      width: `${
                        (fertilizer.availability / (leastAvailable[4]?.availability || 1)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
    </div>
  );
}
