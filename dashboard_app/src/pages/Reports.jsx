import '../css/pages/Page.css'
import '../css/pages/Reports.css'

const Reports = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <p>Generate comprehensive reports and business insights</p>
      </div>
      
      <div className="page-content">
        <div className="reports-grid">
          <div className="report-card">
            <h3>Sales Report</h3>
            <p>Detailed sales performance analysis</p>
            <button className="btn-primary">Generate Report</button>
          </div>
          
          <div className="report-card">
            <h3>Inventory Report</h3>
            <p>Stock levels and inventory analysis</p>
            <button className="btn-primary">Generate Report</button>
          </div>
          
          <div className="report-card">
            <h3>Financial Report</h3>
            <p>Revenue, expenses, and profit analysis</p>
            <button className="btn-primary">Generate Report</button>
          </div>
          
          <div className="report-card">
            <h3>Customer Report</h3>
            <p>Customer behavior and engagement metrics</p>
            <button className="btn-primary">Generate Report</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
