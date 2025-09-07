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

export default Card
