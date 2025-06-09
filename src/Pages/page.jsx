import { useState } from "react"
import Navbar from "../Components/Navbar/Navbar"
import DataTable from "../Components/DataTable/DataTable"
import Analytics from "../Components/Analytic_page/Analytic_page"
import TopFertilizers from "../Components/TopFertilizers/TopFertilizers"
import { data as fertilizerData } from "../data/data"
import "../index.css"

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Analytics")

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Fertilizer Supply Chain Dashboard</h1>
          <p>Track fertilizer requirements and availability across India</p>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === "Analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("Analytics")}
          >
            Analytics
          </button>
         
          <button className={`tab-btn ${activeTab === "data" ? "active" : ""}`} onClick={() => setActiveTab("data")}>
            Data Table
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "Analytics" && (
            <div className="overview-section">
              <TopFertilizers data={fertilizerData} />
              <div className="overview-analytics">
                <Analytics data={fertilizerData} />
              </div>
            </div>
          )}

          {activeTab === "analytics" && <Analytics data={fertilizerData} />}

          {activeTab === "data" && <DataTable data={fertilizerData} />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
