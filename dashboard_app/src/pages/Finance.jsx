import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/pages/Page.css'
import '../css/pages/Finance.css'
// Removed unused imports

const Finance = () => {
  const navigate = useNavigate();
  // Removed unused activeTab state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState('month'); // 'day', 'week', 'month', 'quarter', 'year'
  const [showMonthlyDropdown, setShowMonthlyDropdown] = useState(false);
  const [showDailyDropdown, setShowDailyDropdown] = useState(false);
  
  // API data state
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fallback data for when API fails
  const getFallbackData = () => {
    const monthString = selectedDate.toISOString().slice(0, 7); // YYYY-MM format
    const monthLabel = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return {
      scope: "month",
      period: {
        month: monthString,
        label: monthLabel
      },
    widgets: {
      inquiries_month_total: 2195,
      inquiries_day_total: null
    },
    comparison: {
      current_month: {
        month: "2025-06",
        inquiries: 2195
      },
      previous_month: {
        month: "2025-05",
        inquiries: 2030
      }
    },
    funnel: {
      followed_up: 1357,
      appointments: 211,
      jobs_done: 260,
      cancel_appointments: 45,
      rates: {
        appointments_per_inquiry: 0.096,
        cancel_appointments_per_inquiry: 0.021,
        jobs_per_inquiry: 0.118
      }
    },
    salespeople: {
      rows: [
        {
          id: "3",
          name: "Gamage",
          inquiries: 435,
          appointments: 33,
          cancel_appointments: 6,
          jobs_done: 54
        },
        {
          id: "4",
          name: "Nissanka",
          inquiries: 448,
          appointments: 34,
          cancel_appointments: 8,
          jobs_done: 45
        },
        {
          id: "19",
          name: "Pathum",
          inquiries: 383,
          appointments: 42,
          cancel_appointments: 9,
          jobs_done: 40
        },
        {
          id: "11",
          name: "Prasanna",
          inquiries: 438,
          appointments: 39,
          cancel_appointments: 13,
          jobs_done: 48
        },
        {
          id: "7",
          name: "Musthak",
          inquiries: 480,
          appointments: 62,
          cancel_appointments: 9,
          jobs_done: 68
        },
        {
          id: "2",
          name: "Corporate",
          inquiries: 6,
          appointments: 1,
          cancel_appointments: 0,
          jobs_done: 3
        },
        {
          id: "20",
          name: "Yohan",
          inquiries: 5,
          appointments: 0,
          cancel_appointments: 0,
          jobs_done: 2
        }
      ],
      totals: {
        inquiries: 2195,
        appointments: 211,
        cancel_appointments: 45,
        jobs_done: 260
      }
    }
    };
  };

  // API call function
  const fetchFinanceData = useCallback(async (scope = 'month', month = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const baseUrl = 'https://mgtapi.ecw.lk/api';
      let url = `${baseUrl}/v1/crm/dashboard/?scope=${scope}&tz=Asia/Colombo&include=salespeople,comparison,funnel`;
      
      if (month) {
        url += `&month=${month}`;
      }
      
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.status === 'success' && data.data) {
        setApiData(data.data);
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching finance data:', err);
      setError(err.message);
      // Use fallback data when API fails
      setApiData(getFallbackData());
    } finally {
      setLoading(false);
    }
  }, []);

  // Generate month options for dropdown
  const generateMonthOptions = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = -12; i <= 0; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      months.push({
        value: date.toISOString().slice(0, 7), // YYYY-MM format
        label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    }
    return months.reverse();
  };

  // Generate day options for dropdown (last 30 days)
  const generateDayOptions = () => {
    const days = [];
    const currentDate = new Date();
    for (let i = -30; i <= 0; i++) {
      const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      days.push({
        value: date.toISOString().slice(0, 10), // YYYY-MM-DD format
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short', 
          year: '2-digit' 
        })
      });
    }
    return days.reverse();
  };

  // Monthly comparison data from API
  const getMonthlyData = () => {
    if (!apiData || !apiData.comparison || !apiData.funnel) return [];
    
    const { comparison, funnel } = apiData;
    return [
      { month: 'Current Month', inquiries: comparison.current_month?.inquiries || 0, color: 'primary' },
      { month: 'Previous Month', inquiries: comparison.previous_month?.inquiries || 0, color: 'success' },
      { month: 'Followed Up', inquiries: funnel.followed_up || 0, color: 'info' },
      { month: 'Appointments', inquiries: funnel.appointments || 0, color: 'warning' },
      { month: 'Jobs Done', inquiries: funnel.jobs_done || 0, color: 'danger' }
    ];
  };

  // Salespeople data from API
  const getSalespeopleData = () => {
    if (!apiData?.salespeople?.rows || !Array.isArray(apiData.salespeople.rows)) return [];
    
    const colors = ['success', 'primary', 'info', 'warning', 'danger', 'secondary', 'dark'];
    return apiData.salespeople.rows.map((person, index) => ({
      name: person.name || 'Unknown',
      inquiries: person.inquiries || 0,
      appointments: person.appointments || 0,
      jobs: person.jobs_done || 0,
      color: colors[index % colors.length]
    }));
  };

  // Date formatting function
  const formatDateDisplay = () => {
    switch (dateRange) {
      case 'day':
        return selectedDate.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
      case 'week':
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      case 'month':
        return selectedDate.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
      case 'quarter':
        const quarter = Math.floor(selectedDate.getMonth() / 3) + 1;
        return `Q${quarter} ${selectedDate.getFullYear()}`;
      case 'year':
        return selectedDate.getFullYear().toString();
      default:
        return selectedDate.toLocaleDateString();
    }
  };

  // Handle month selection
  const handleMonthSelection = (monthValue) => {
    const [year, month] = monthValue.split('-');
    setSelectedDate(new Date(year, month - 1, 1));
    setShowMonthlyDropdown(false);
  };

  // Handle day selection
  const handleDaySelection = (dayValue) => {
    setSelectedDate(new Date(dayValue));
    setShowDailyDropdown(false);
  };

  // Fetch data on component mount and when date changes
  useEffect(() => {
    const monthString = selectedDate.toISOString().slice(0, 7); // YYYY-MM format
    fetchFinanceData(dateRange, monthString);
  }, [selectedDate, dateRange, fetchFinanceData]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.inquiry-dropdown-container')) {
        setShowMonthlyDropdown(false);
        setShowDailyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="page">
      <div className="container-fluid py-4">
        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading finance data...</p>
            </div>
          </div>
        )}
        
        {!loading && !apiData && (
          <div className="text-center py-5">
            <div className="text-muted">
              <i className="bi bi-inbox fs-1"></i>
              <p className="mt-2">No data available</p>
            </div>
          </div>
        )}

        {!loading && apiData && (
          <>
            {error && (
              <div className="alert alert-info" role="alert">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Demo Mode:</strong> Showing sample data. API connection unavailable.
                    <br />
                    <small className="text-muted">Error: {error}</small>
                  </div>
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      const monthString = selectedDate.toISOString().slice(0, 7);
                      fetchFinanceData(dateRange, monthString);
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Retry
                  </button>
                </div>
              </div>
            )}
        

        {/* Financial Summary Cards */}
        <div className="row mb-4">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
            <div 
              className="inquiry-card inquiry-card-monthly"
              onClick={() => navigate('/sales')}
              style={{ cursor: 'pointer' }}
            >
              <div className="inquiry-card-header">
                <div className="inquiry-period">{formatDateDisplay()}</div>
                <div className="inquiry-dropdown-container">
                  <div 
                    className="inquiry-dropdown"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMonthlyDropdown(!showMonthlyDropdown);
                    }}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </div>
                  {showMonthlyDropdown && (
                    <div className="inquiry-dropdown-menu">
                      {generateMonthOptions().map((month, index) => (
                        <div 
                          key={index}
                          className={`inquiry-dropdown-item ${apiData?.period?.month === month.value ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMonthSelection(month.value);
                          }}
                        >
                          {month.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="inquiry-value">
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  apiData?.widgets?.inquiries_month_total || 0
                )}
              </div>
              <div className="inquiry-label">Inquiries</div>
              <div className="inquiry-underline"></div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
            <div 
              className="inquiry-card inquiry-card-daily"
              onClick={() => navigate('/sales')}
              style={{ cursor: 'pointer' }}
            >
              <div className="inquiry-card-header">
                <div className="inquiry-period">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: '2-digit' 
                  })}
                </div>
                <div className="inquiry-dropdown-container">
                  <div 
                    className="inquiry-dropdown"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDailyDropdown(!showDailyDropdown);
                    }}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </div>
                  {showDailyDropdown && (
                    <div className="inquiry-dropdown-menu">
                      {generateDayOptions().map((day, index) => (
                        <div 
                          key={index}
                          className="inquiry-dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDaySelection(day.value);
                          }}
                        >
                          {day.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="inquiry-value">
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  apiData?.widgets?.inquiries_day_total || 0
                )}
              </div>
              <div className="inquiry-label">Inquiries</div>
              <div className="inquiry-underline"></div>
            </div>
          </div>
        </div>

        

        {/* Monthly Comparison Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Monthly Financial Performance</h5>
                  <div className="d-flex gap-2">
                    <select 
                      className="form-select form-select-sm" 
                      style={{ width: 'auto' }}
                      value={apiData?.period?.month || '2025-06'}
                      onChange={(e) => {
                        const selectedMonth = e.target.value;
                        const [year, month] = selectedMonth.split('-');
                        setSelectedDate(new Date(year, month - 1, 1));
                      }}
                    >
                      {generateMonthOptions().map((month, index) => (
                        <option key={index} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  {getMonthlyData().map((item, index) => (
                    <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-3">
                      <div 
                        className="monthly-performance-item"
                        onClick={() => navigate('/sales')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="monthly-performance-content">
                          <div className="monthly-performance-left">
                            <h6 className="mb-1">{item.month}</h6>
                            <h4 className={`text-${item.color} mb-0`}>{item.inquiries}</h4>
                          </div>
                          <div className="monthly-performance-right">
                            <div className={`progress`} style={{ height: '8px' }}>
                              <div 
                                className={`progress-bar bg-${item.color}`}
                                style={{ width: `${Math.min((item.inquiries / 2500) * 100, 100)}%` }}
                                role="progressbar"
                                aria-valuenow={item.inquiries}
                                aria-valuemin="0"
                                aria-valuemax="2500"
                              >
                              </div>
                            </div>
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

        {/* Department Performance Table */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 me-2">Follow - Ups </h5>
                  <span className="badge bg-primary">{apiData?.period?.label || 'Jun 2025'}</span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="department-column">Department</th>
                        <th className="text-end">Inq</th>
                        <th className="text-end">Apt</th>
                        <th className="text-end">Jobs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSalespeopleData().map((person, index) => {
                        return (
                          <tr 
                            key={index}
                            onClick={() => navigate('/inventory')}
                            style={{ cursor: 'pointer' }}
                            className="table-row-hover"
                          >
                            <td>
                              <div className="d-flex align-items-center">
                                <div className={`bg-${person.color} bg-opacity-10 rounded-circle me-2 d-flex align-items-center justify-content-center`} 
                                     style={{ width: '12px', height: '12px' }}>
                                  <i className={`bi bi-person text-${person.color}`}></i>
                                </div>
                                <span className="fw-semibold">{person.name}</span>
                              </div>
                            </td>
                            <td className="text-end">
                              <span className="text-success fw-semibold">
                                {person.inquiries.toLocaleString()}
                              </span>
                            </td>
                            <td className="text-end">
                              <span className="text-warning fw-semibold">
                                {person.appointments.toLocaleString()}
                              </span>
                            </td>
                            <td className="text-end">
                              <span className="text-primary fw-semibold">
                                {person.jobs.toLocaleString()}
                              </span>
                            </td>
                            
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="table-light">
                      <tr>
                        <th>Total</th>
                        <th className="text-end text-success">
                          {apiData?.salespeople?.totals?.inquiries?.toLocaleString() || 0}
                        </th>
                        <th className="text-end text-warning">
                          {apiData?.salespeople?.totals?.appointments?.toLocaleString() || 0}
                        </th>
                        <th className="text-end text-primary">
                          {apiData?.salespeople?.totals?.jobs_done?.toLocaleString() || 0}
                        </th>
                       
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Finance
