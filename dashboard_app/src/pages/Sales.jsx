import React, { useState } from 'react';
import '../css/pages/Page.css'
import '../css/pages/Sales.css'

const Sales = () => {
  const [startDate, setStartDate] = useState('2025-09-01');
  const [endDate, setEndDate] = useState('2025-09-31');
  const [filters, setFilters] = useState({
    pending: true,
    fu: true,
    apt: true,
    job: true
  });

  // Sample sales data
  const salesData = [
    {
      id: 1,
      date: '2025-08-24',
      badge: { number: 12, color: 'success' },
      title: 'Land Rover - Defender - 1969',
      details: ['Hettiarachchi', 'Kaduwela'],
      assignee: 'Prasanna',
      status: 'completed',
      statusIcon: 'check-circle-fill'
    },
    {
      id: 2,
      date: '2025-08-28',
      badge: { number: 8, color: 'danger' },
      title: 'Honda - Vezel - 2025',
      details: ['lakshan', 'Kaduwela'],
      assignee: 'Gamage',
      status: 'pending',
      statusIcon: 'clock-fill'
    },
    {
      id: 3,
      date: '2025-09-01',
      badge: { number: 4, color: 'warning' },
      title: 'Land Rover - Defender - 1969',
      details: ['Hettiarachchi', 'Kaduwela'],
      assignee: 'Prasanna',
      status: 'in-progress',
      statusIcon: 'clock-fill',
      urgent: true
    }
  ];

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'danger';
      case 'in-progress': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'bi-check-circle-fill';
      case 'pending': return 'bi-clock-fill';
      case 'in-progress': return 'bi-clock-fill';
      default: return 'bi-circle';
    }
  };

  return (
    <div className="page">
      <div className="container-fluid py-4">
        
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            
          </div>
        </div>

        {/* Filter Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row align-items-end">
                  {/* Date Filters */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <button className="btn btn-primary">
                      <i className="bi bi-funnel me-2"></i>Filter
                    </button>
                  </div>
                </div>

                {/* Status Filters */}
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex flex-wrap gap-3">
                      {Object.entries(filters).map(([key, value]) => (
                        <div key={key} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={key}
                            checked={value}
                            onChange={() => handleFilterChange(key)}
                          />
                          <label className="form-check-label fw-semibold" htmlFor={key}>
                            {/* <i className={`bi bi-${value ? 'check-circle-fill text-success' : 'circle'} me-2`}></i> */}
                            {key.toUpperCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Items List */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="card-title mb-0">Sales Items</h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {salesData.map((item) => (
                    <div key={item.id} className="list-group-item border-0 py-3 position-relative">
                      {/* Urgent Badge */}
                      {item.urgent && (
                        <div className="position-absolute top-0 start-0 bg-danger" 
                             style={{ width: '20px', height: '20px', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
                        </div>
                      )}
                      
                      <div className="row align-items-center">
                        {/* Date and Badge */}
                        <div className="col-md-2">
                          <div className="d-flex align-items-center">
                            <span className="text-muted me-2">{item.date}</span>
                            <span className={`badge bg-${item.badge.color} rounded-pill`}>
                              {item.badge.number}
                            </span>
                          </div>
                        </div>

                        {/* Title and Details */}
                        <div className="col-md-6">
                          <h6 className="fw-bold mb-1">{item.title}</h6>
                          <div className="text-muted small">
                            {item.details.map((detail, index) => (
                              <span key={index}>
                                {detail}
                                {index < item.details.length - 1 && ' • '}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Assignee and Status */}
                        <div className="col-md-4 text-end">
                          <div className="d-flex align-items-center justify-content-end">
                            <span className="me-2">{item.assignee}</span>
                            <i className={`bi ${getStatusIcon(item.status)} text-${getStatusColor(item.status)}`}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row mt-4">
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h3 className="text-primary mb-1">24</h3>
                <p className="text-muted mb-0">Total Sales</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h3 className="text-success mb-1">12</h3>
                <p className="text-muted mb-0">Completed</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h3 className="text-warning mb-1">8</h3>
                <p className="text-muted mb-0">In Progress</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <h3 className="text-danger mb-1">4</h3>
                <p className="text-muted mb-0">Pending</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sales
