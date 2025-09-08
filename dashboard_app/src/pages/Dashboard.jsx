import { useNavigate } from 'react-router-dom'
import '../css/pages/Page.css'
import { Card, QuickActionCard } from '../components/Dashboard/card_components'
import { 
  Compass,
  Calendar1,
  BadgeDollarSign,
  CircleUserRound 
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()

  // Quick Action Cards Data
  const quickActions = [
    { 
      icon: <Compass  size={32} />, 
      title: "CRM", 
      description: "Customer Management",
      color: "primary",
      path: "/finance"
    },
    { 
      icon: <Calendar1 size={32} />, 
      title: "JOB CARDS", 
      description: "Job Management",
      color: "pink",
      path: "/inventory"
    },
    { 
      icon: <BadgeDollarSign size={32} />, 
      title: "SALES", 
      description: "Sales Analytics",
      color: "warning",
      path: "/sales"
    },
    { 
      icon: <CircleUserRound  size={32} />, 
      title: "HRM", 
      description: "Human Resources",
      color: "success",
      path: "/hrm"
    },
   
  ]

  const handleCardClick = (path) => {
    navigate(path)
  }


  return (
    <div className="page">
      <div className="page-content mt-4">
        <div className="cards-grid cards-grid-3 mt-4">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              icon={action.icon}
              title={action.title}
              description={action.description}
              color={action.color}
              onClick={() => handleCardClick(action.path)}
            />
          ))}
        </div>

      
       
      </div>
    </div>
  )
}

export default Dashboard;
