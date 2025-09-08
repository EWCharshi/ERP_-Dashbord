import React, { useState, useEffect } from "react";
import axios from "axios"; // npm install axios
import "../css/pages/Page.css";
import "../css/pages/Finance.css";
import {
  FinanceMetricCard,
  TransactionCard,
  BudgetProgressCard,
  ChartCard,
} from "../components/Dashboard/card_components";
import CRMNavbar from "../components/Common/mainlink";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default: today
  const [inquiriesMonthly, setInquiriesMonthly] = useState(null);
  const [inquiriesDaily, setInquiriesDaily] = useState(null);
  const [loading, setLoading] = useState(false);

  // Format selected month & year for display
  const formatDateDisplay = () => {
    return selectedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Handle month & year change
  const handleMonthYearChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1, 1));
  };

  // Fetch data from API
  const fetchFinanceData = async () => {
    try {
      setLoading(true);

      // Format start of month (YYYY-MM-01)
      const startOfMonth = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-01`;

      console.log("📅 Sending request with date:", startOfMonth);

      const response = await axios.get(
        `https://mgtapi.ecw.lk/api/v1/crm/dashboard/`,
        {
          params: {
            scope: "month", // keep scope=month
            month: startOfMonth, // ✅ use "date" instead of "month"
            tz: "Asia/Colombo",
            include: "salespeople,comparison,funnel",
          },
        }
      );

      console.log("✅ API full response:", response.data);

      if (response.data?.data?.widgets) {
        const data = response.data.data.widgets;

        // Check what keys exist in widgets
        console.log("🔍 API widgets:", data);

        setInquiriesMonthly(
          data.inquiries_month_total ?? data.inquiriesMonth ?? 0
        );
        setInquiriesDaily(
          data.inquiries_day_total ?? data.inquiriesDay ?? 0
        );
      } else {
        console.warn("⚠️ No widgets found in API response");
        setInquiriesMonthly(0);
        setInquiriesDaily(0);
      }
    } catch (error) {
      console.error("❌ Error fetching finance data:", error);
      setInquiriesMonthly(0);
      setInquiriesDaily(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when selectedDate changes
  useEffect(() => {
    fetchFinanceData();
  }, [selectedDate]);

  return (
    <div className="page">
      <div className="container-fluid py-4">
        {/* Month-Year Selector */}
        <div className="row mb-3">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <h5>Selected Period: {formatDateDisplay()}</h5>
            <input
              type="month"
              className="form-control w-auto"
              value={`${selectedDate.getFullYear()}-${String(
                selectedDate.getMonth() + 1
              ).padStart(2, "0")}`}
              onChange={handleMonthYearChange}
            />
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="row mb-4">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
            <div className="inquiry-card inquiry-card-monthly">
              <div className="inquiry-value">
                {loading
                  ? "Loading..."
                  : inquiriesMonthly !== null
                  ? inquiriesMonthly
                  : 0}
              </div>
              <div className="inquiry-label">Inquiries (Monthly)</div>
              <div className="inquiry-underline"></div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
            <div className="inquiry-card inquiry-card-daily">
              <div className="inquiry-value">
                {loading
                  ? "Loading..."
                  : inquiriesDaily !== null
                  ? inquiriesDaily
                  : 0}
              </div>
              <div className="inquiry-label">Inquiries (Daily)</div>
              <div className="inquiry-underline"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
