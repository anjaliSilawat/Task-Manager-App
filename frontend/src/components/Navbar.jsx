import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">TaskManager</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hey, {user?.name} 👋</span>
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}