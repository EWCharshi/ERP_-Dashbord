import '../css/pages/Page.css'
import '../css/pages/Sales.css'

const Sales = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Sales Management</h1>
        <p>Track sales performance and manage customer orders</p>
      </div>
      
      <div className="page-content">
        <div className="sales-overview">
          <div className="sales-card">
            <h3>Today's Sales</h3>
            <div className="sales-value">$12,450</div>
          </div>
          <div className="sales-card">
            <h3>This Month</h3>
            <div className="sales-value">$125,430</div>
          </div>
          <div className="sales-card">
            <h3>Pending Orders</h3>
            <div className="sales-value">45</div>
          </div>
        </div>
        
        <div className="sales-chart">
          <h3>Sales Performance</h3>
          <p>Sales charts and analytics will be displayed here.</p>
        </div>
      </div>
    </div>
  )
}

export default Sales
