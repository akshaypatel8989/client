import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useMeQuery } from '../services/api'

export default function ProtectedRoute({ roles }) {
  const location = useLocation()
  const { data, isLoading } = useMeQuery()
  if (isLoading) return <div className="loading-screen"><span className="loading-mark">T</span><p>Loading your workspace...</p></div>
  if (!data?.user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (roles && !roles.includes(data.user.role)) return <Navigate to="/" replace />
  return <Outlet context={{ user: data.user }} />
}
