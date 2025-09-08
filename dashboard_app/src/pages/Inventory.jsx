import React, { useState, useEffect } from 'react';
import '../css/pages/Page.css'
import '../css/pages/Inventory.css'
import { FinanceMetricCard, TransactionCard, BudgetProgressCard, ChartCard } from '../components/Dashboard/card_components'
import CRMNavbar from '../components/Common/mainlink'


const Inventory = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState('month'); // 'day', 'week', 'month', 'quarter', 'year'
  const [showMonthlyDropdown, setShowMonthlyDropdown] = useState(false);
  const [showDailyDropdown, setShowDailyDropdown] = useState(false);

  // Monthly comparison data
  const monthlyData = [
    { month: 'May 2025', inquiries: 386, color: 'primary' },
    { month: 'Jun 2025', inquiries: 234, color: 'success' },
    { month: 'Followed', inquiries: 217, color: 'info' },
    { month: 'Appointments', inquiries: 160, color: 'warning' },
    { month: 'Jobs', inquiries: 67, color: 'danger' }
  ];

  // Financial performance by department
  const departmentData = [
    { name: 'Samantha', revenue: 22, expenses: 21, profit: 22, color: 'success' },
    { name: 'Gamage', revenue: 23, expenses: 18, profit: 15, color: 'primary' },
    { name: 'Yasitha Perera', revenue: 22, expenses: 15, profit: 13, color: 'info' },
    { name: 'Debra Myers', revenue: 12, expenses: 12, profit: 10, color: 'warning' }
  ];

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
        

        {/* Financial Summary Cards */}
        <div className="row mb-4">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
            <div className="inquiry-card inquiry-card-monthly">
              <div className="inquiry-card-header">
                <div className="inquiry-period">{formatDateDisplay()}</div>
                <div className="inquiry-dropdown-container">
                  <div 
                    className="inquiry-dropdown"
                    onClick={() => setShowMonthlyDropdown(!showMonthlyDropdown)}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </div>
                  {showMonthlyDropdown && (
                    <div className="inquiry-dropdown-menu">
                      {generateMonthOptions().map((month, index) => (
                        <div 
                          key={index}
                          className="inquiry-dropdown-item"
                          onClick={() => handleMonthSelection(month.value)}
                        >
                          {month.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="inquiry-value">234</div>
              <div className="inquiry-label">Inquiries</div>
              <div className="inquiry-underline"></div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
            <div className="inquiry-card inquiry-card-daily">
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
                    onClick={() => setShowDailyDropdown(!showDailyDropdown)}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </div>
                  {showDailyDropdown && (
                    <div className="inquiry-dropdown-menu">
                      {generateDayOptions().map((day, index) => (
                        <div 
                          key={index}
                          className="inquiry-dropdown-item"
                          onClick={() => handleDaySelection(day.value)}
                        >
                          {day.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="inquiry-value">14</div>
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
                    <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                      <option>Jun 2025</option>
                      <option>May 2025</option>
                      <option>Apr 2025</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  {monthlyData.map((item, index) => (
                    <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-3">
                      <div className="monthly-performance-item">
                        <div className="monthly-performance-content">
                          <div className="monthly-performance-left">
                            <h6 className="mb-1">{item.month}</h6>
                            <h4 className={`text-${item.color} mb-0`}>{item.inquiries}</h4>
                          </div>
                          <div className="monthly-performance-right">
                            <div className={`progress`} style={{ height: '8px' }}>
                              <div 
                                className={`progress-bar bg-${item.color}`}
                                style={{ width: `${(item.inquiries / 400) * 100}%` }}
                                role="progressbar"
                                aria-valuenow={item.inquiries}
                                aria-valuemin="0"
                                aria-valuemax="400"
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
                  <span className="badge bg-primary">Jun 2025</span>
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
                      {departmentData.map((dept, index) => {
                        const margin = ((dept.profit / dept.revenue) * 100).toFixed(1);
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className={`bg-${dept.color} bg-opacity-10 rounded-circle me-2 d-flex align-items-center justify-content-center`} 
                                     style={{ width: '12px', height: '12px' }}>
                                  <i className={`bi bi-building text-${dept.color}`}></i>
                                </div>
                                <span className="fw-semibold">{dept.name}</span>
                              </div>
                            </td>
                            <td className="text-end">
                              <span className="text-success fw-semibold">
                                ${dept.revenue.toLocaleString()}
                              </span>
                            </td>
                            <td className="text-end">
                              <span className="text-danger fw-semibold">
                                ${dept.expenses.toLocaleString()}
                              </span>
                            </td>
                            <td className="text-end">
                              <span className="text-primary fw-semibold">
                                ${dept.profit.toLocaleString()}
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
                          ${departmentData.reduce((sum, dept) => sum + dept.revenue, 0).toLocaleString()}
                        </th>
                        <th className="text-end text-danger">
                          ${departmentData.reduce((sum, dept) => sum + dept.expenses, 0).toLocaleString()}
                        </th>
                        <th className="text-end text-primary">
                          ${departmentData.reduce((sum, dept) => sum + dept.profit, 0).toLocaleString()}
                        </th>
                       
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
     
    </div>
  )
}

export default Inventory
