import React, { useState, useEffect } from 'react';
import '../css/pages/Page.css'
import '../css/pages/Finance.css'
import { FinanceMetricCard, TransactionCard, BudgetProgressCard, ChartCard } from '../components/Dashboard/card_components'
import CRMNavbar from '../components/Common/mainlink'

const Finance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState('month'); // 'day', 'week', 'month', 'quarter', 'year'
  const [showMonthlyDropdown, setShowMonthlyDropdown] = useState(false);
  const [showDailyDropdown, setShowDailyDropdown] = useState(false);

  // Sample financial data
  const financialData = {
    totalRevenue: 125000,
    totalExpenses: 85000,
    netProfit: 40000,
    monthlyGrowth: 12.5,
    quarterlyGrowth: 8.3,
    profitMargin: 32
  };

  const recentTransactions = [
    { id: 1, description: 'Product Sales', amount: 15000, type: 'income', date: '2024-01-15', status: 'completed', category: 'Sales' },
    { id: 2, description: 'Office Rent', amount: 5000, type: 'expense', date: '2024-01-14', status: 'completed', category: 'Rent' },
    { id: 3, description: 'Equipment Purchase', amount: 8000, type: 'expense', date: '2024-01-13', status: 'pending', category: 'Equipment' },
    { id: 4, description: 'Service Revenue', amount: 12000, type: 'income', date: '2024-01-12', status: 'completed', category: 'Services' },
    { id: 5, description: 'Marketing Campaign', amount: 3000, type: 'expense', date: '2024-01-11', status: 'completed', category: 'Marketing' }
  ];

  const budgetData = [
    { category: 'Marketing', spent: 8500, budget: 10000, color: 'primary' },
    { category: 'Operations', spent: 12000, budget: 15000, color: 'success' },
    { category: 'Equipment', spent: 18000, budget: 15000, color: 'danger' },
    { category: 'Travel', spent: 3200, budget: 5000, color: 'warning' }
  ];

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
        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  
                </div>
              <div>
                <button className="btn btn-primary me-2">
                  <i className="bi bi-plus-circle me-1"></i>Add Transaction
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-download me-1"></i>Export Report
                </button>
              </div>
            </div>
          </div>
        </div>

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

        {/* Navigation Tabs */}
        <div className="row mb-4">
          <div className="col-12">
            <ul className="nav nav-tabs" id="financeTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                  type="button"
                >
                  <i className="bi bi-graph-up me-2"></i>Overview
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('transactions')}
                  type="button"
                >
                  <i className="bi bi-list-ul me-2"></i>Transactions
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'budgets' ? 'active' : ''}`}
                  onClick={() => setActiveTab('budgets')}
                  type="button"
                >
                  <i className="bi bi-wallet2 me-2"></i>Budgets
                </button>
              </li>
            </ul>
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
                        <th>Department</th>
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

        {/* Tab Content */}
        <div className="tab-content" id="financeTabContent">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="row">
              <div className="col-lg-8 mb-4">
                <ChartCard title="Revenue vs Expenses Trend">
                  <div className="text-center py-5">
                    <i className="bi bi-bar-chart text-muted" style={{ fontSize: '4rem' }}></i>
                    <p className="text-muted mt-3">Interactive chart visualization will be implemented here</p>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div className="text-center">
                          <h4 className="text-success">$125,000</h4>
                          <small className="text-muted">Total Revenue</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-center">
                          <h4 className="text-danger">$85,000</h4>
                          <small className="text-muted">Total Expenses</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </ChartCard>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0">
                    <h5 className="card-title mb-0">Quick Actions</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-plus-circle me-2"></i>Add Income
                      </button>
                      <button className="btn btn-outline-danger">
                        <i className="bi bi-dash-circle me-2"></i>Add Expense
                      </button>
                      <button className="btn btn-outline-secondary">
                        <i className="bi bi-download me-2"></i>Export Data
                      </button>
                      <button className="btn btn-outline-info">
                        <i className="bi bi-calendar me-2"></i>Set Budget
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">Recent Transactions</h5>
                      <div className="d-flex gap-2">
                        <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                          <option>All Types</option>
                          <option>Income</option>
                          <option>Expense</option>
                        </select>
                        <button className="btn btn-primary btn-sm">
                          <i className="bi bi-plus me-1"></i>Add New
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {recentTransactions.map((transaction) => (
                      <TransactionCard
                        key={transaction.id}
                        description={transaction.description}
                        amount={transaction.amount}
                        type={transaction.type}
                        date={transaction.date}
                        status={transaction.status}
                        category={transaction.category}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Budgets Tab */}
          {activeTab === 'budgets' && (
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">Budget Management</h5>
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-plus me-1"></i>Create Budget
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {budgetData.map((budget, index) => (
                        <div key={index} className="col-md-6 col-lg-3 mb-3">
                          <BudgetProgressCard
                            category={budget.category}
                            spent={budget.spent}
                            budget={budget.budget}
                            color={budget.color}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance
