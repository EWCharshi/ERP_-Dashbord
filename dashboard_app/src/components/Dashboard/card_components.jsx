import React from 'react'
import '../../css/components/card_components.css'

// Base Card Component
export const Card = ({ 
  icon, 
  label, 
  color = 'primary',
  onClick,
  className = '' 
}) => {
  return (
    <div 
      className={`card card-${color} ${className}`}
      onClick={onClick}
    >
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-label">{label}</h3>
      </div>
    </div>
  )
}

// Quick Action Card Component
export const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  color = 'primary',
  onClick,
  className = '' 
}) => {
  return (
    <div 
      className={`quick-action-card quick-action-card-${color} ${className}`}
      onClick={onClick}
    >
      <div className={`quick-action-icon quick-action-icon-${color}`}>
        {icon}
      </div>
      <div className="quick-action-content">
        <h3 className='quick-action-title'>{title}</h3>
        {description && (
          <p className="quick-action-description">{description}</p>
        )}
      </div>
    </div>
  )
}

// Finance Metric Card Component
export const FinanceMetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', // 'positive', 'negative', 'neutral'
  icon, 
  color = 'primary',
  currency = '$',
  onClick,
  className = '' 
}) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(val);
    }
    return val;
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <i className="bi bi-arrow-up text-success"></i>;
      case 'negative':
        return <i className="bi bi-arrow-down text-danger"></i>;
      default:
        return <i className="bi bi-dash text-muted"></i>;
    }
  };

  const getChangeClass = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-danger';
      default:
        return 'text-muted';
    }
  };

  return (
    <div 
      className={`finance-metric-card finance-metric-card-${color} ${className}`}
      onClick={onClick}
    >
      <div className="finance-metric-header">
        <div className="finance-metric-icon">
          {icon}
        </div>
        <div className="finance-metric-title">
          {title}
        </div>
      </div>
      <div className="finance-metric-value">
        {formatValue(value)}
      </div>
      {change && (
        <div className={`finance-metric-change ${getChangeClass()}`}>
          {getChangeIcon()}
          <span>{change}</span>
        </div>
      )}
    </div>
  )
}

// Transaction Card Component
export const TransactionCard = ({ 
  description, 
  amount, 
  type = 'income', // 'income', 'expense'
  date, 
  status = 'completed', // 'completed', 'pending', 'cancelled'
  category,
  onClick,
  className = '' 
}) => {
  const formatAmount = (amt) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amt);
  };

  const getTypeIcon = () => {
    return type === 'income' 
      ? <i className="bi bi-arrow-up-circle text-success"></i>
      : <i className="bi bi-arrow-down-circle text-danger"></i>;
  };

  const getStatusBadge = () => {
    const statusClasses = {
      completed: 'badge bg-success',
      pending: 'badge bg-warning',
      cancelled: 'badge bg-danger'
    };
    return statusClasses[status] || 'badge bg-secondary';
  };

  return (
    <div 
      className={`transaction-card ${className}`}
      onClick={onClick}
    >
      <div className="transaction-card-header">
        <div className="transaction-type-icon">
          {getTypeIcon()}
        </div>
        <div className="transaction-info">
          <div className="transaction-description">{description}</div>
          {category && <div className="transaction-category">{category}</div>}
        </div>
        <div className="transaction-amount">
          <span className={type === 'income' ? 'text-success' : 'text-danger'}>
            {type === 'income' ? '+' : '-'}{formatAmount(amount)}
          </span>
        </div>
      </div>
      <div className="transaction-card-footer">
        <div className="transaction-date">
          {new Date(date).toLocaleDateString()}
        </div>
        <div className="transaction-status">
          <span className={getStatusBadge()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  )
}

// Budget Progress Card Component
export const BudgetProgressCard = ({ 
  category, 
  spent, 
  budget, 
  color = 'primary',
  onClick,
  className = '' 
}) => {
  const percentage = Math.min((spent / budget) * 100, 100);
  const isOverBudget = spent > budget;
  
  const formatAmount = (amt) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amt);
  };

  return (
    <div 
      className={`budget-progress-card budget-progress-card-${color} ${className}`}
      onClick={onClick}
    >
      <div className="budget-progress-header">
        <div className="budget-category">{category}</div>
        <div className={`budget-amount ${isOverBudget ? 'text-danger' : 'text-success'}`}>
          {formatAmount(spent)} / {formatAmount(budget)}
        </div>
      </div>
      <div className="budget-progress-bar">
        <div 
          className={`budget-progress-fill ${isOverBudget ? 'bg-danger' : `bg-${color}`}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="budget-progress-footer">
        <div className="budget-percentage">
          {percentage.toFixed(1)}% used
        </div>
        {isOverBudget && (
          <div className="budget-over text-danger">
            Over budget by {formatAmount(spent - budget)}
          </div>
        )}
      </div>
    </div>
  )
}

// Chart Card Component
export const ChartCard = ({ 
  title, 
  children, 
  color = 'primary',
  className = '' 
}) => {
  return (
    <div className={`chart-card chart-card-${color} ${className}`}>
      <div className="chart-card-header">
        <h3 className="chart-card-title">{title}</h3>
      </div>
      <div className="chart-card-content">
        {children}
      </div>
    </div>
  )
}

export default Card
