import '../css/pages/Page.css'
import '../css/pages/Inventory.css'

const Inventory = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Inventory Management</h1>
        <p>Manage your product inventory and stock levels</p>
      </div>
      
      <div className="page-content">
        <div className="inventory-stats">
          <div className="stat-card total-products">
            <div className="stat-icon">
              <div className="icon-circle products-icon">📦</div>
            </div>
            <h3>Total Products</h3>
            <div className="stat-value">5,678</div>
            <div className="stat-trend positive">+2.3% this month</div>
          </div>
          <div className="stat-card low-stock">
            <div className="stat-icon">
              <div className="icon-circle warning-icon">⚠️</div>
            </div>
            <h3>Low Stock Items</h3>
            <div className="stat-value warning">23</div>
            <div className="stat-trend negative">Needs attention</div>
          </div>
          <div className="stat-card out-of-stock">
            <div className="stat-icon">
              <div className="icon-circle danger-icon">❌</div>
            </div>
            <h3>Out of Stock</h3>
            <div className="stat-value danger">7</div>
            <div className="stat-trend negative">Urgent restock needed</div>
          </div>
        </div>
        
        <div className="inventory-sections">
          <div className="inventory-table">
            <div className="table-header">
              <h3>Recent Inventory Updates</h3>
              <div className="table-actions">
                <button className="btn-primary">Add Product</button>
                <button className="btn-secondary">Export</button>
              </div>
            </div>
            <div className="table-content">
              <div className="inventory-item">
                <div className="item-info">
                  <div className="item-color-dot blue"></div>
                  <span className="item-name">Laptop Pro 15"</span>
                </div>
                <div className="item-stock">
                  <span className="stock-level high">In Stock</span>
                  <span className="stock-count">45 units</span>
                </div>
                <div className="item-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
              <div className="inventory-item">
                <div className="item-info">
                  <div className="item-color-dot orange"></div>
                  <span className="item-name">Wireless Mouse</span>
                </div>
                <div className="item-stock">
                  <span className="stock-level low">Low Stock</span>
                  <span className="stock-count">3 units</span>
                </div>
                <div className="item-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
              <div className="inventory-item">
                <div className="item-info">
                  <div className="item-color-dot red"></div>
                  <span className="item-name">USB-C Cable</span>
                </div>
                <div className="item-stock">
                  <span className="stock-level out">Out of Stock</span>
                  <span className="stock-count">0 units</span>
                </div>
                <div className="item-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
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
