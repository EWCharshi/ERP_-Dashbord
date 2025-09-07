import '../css/pages/Page.css'
import '../css/pages/Finance.css'

const Finance = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Financial Management</h1>
        <p>Monitor financial performance and manage accounting</p>
      </div>
      
      <div className="page-content">
        <div className="finance-summary">
          <div className="finance-card">
            <h3>Total Revenue</h3>
            <div className="finance-value positive">$1,250,000</div>
          </div>
          <div className="finance-card">
            <h3>Total Expenses</h3>
            <div className="finance-value negative">$850,000</div>
          </div>
          <div className="finance-card">
            <h3>Net Profit</h3>
            <div className="finance-value positive">$400,000</div>
          </div>
        </div>
        
        <div className="finance-details">
          <h3>Financial Reports</h3>
          <p>Detailed financial reports and analytics will be available here.</p>
        </div>
      </div>
    </div>
  )
}

export default Finance
