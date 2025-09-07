import { useState } from 'react'
import '../css/pages/Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }
    
    // Simple login logic (you can replace with actual authentication)
    if (username === 'admin' && password === 'password') {
      onLogin()
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-circle">
              <span className="logo-text">ECW</span>
            </div>
          </div>
          <h1 className="login-title">Information System Login</h1>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button type="submit" className="login-button">
            Login
          </button>
          
          <div className="forgot-password">
            <a href="#" className="forgot-link">Forgot your password?</a>
          </div>
        </form>
        
        <div className="login-footer">
          <p className="demo-credentials">
            Demo credentials: admin / password
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
