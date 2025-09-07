// CRMNavbar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCompass } from "react-icons/fa"; // compass icon

export default function CRMNavbar() {
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: "#0050ff" }}>
      <div className="container-fluid d-flex align-items-center">
        {/* Left circle button */}
        <button
          className="btn btn-outline-light rounded-circle me-3"
          style={{ width: "40px", height: "40px", padding: "0" }}
        >
          <span className="fw-bold">&lt;</span>
        </button>

        {/* Compass Icon + Text */}
        <FaCompass className="text-white me-2" />
        <span className="navbar-brand mb-0 h5">CRM</span>
      </div>
    </nav>
  );
}
