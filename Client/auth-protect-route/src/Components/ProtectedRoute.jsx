import { Navigate } from 'react-router-dom';//navigate ind

const ProtectedRoute = ({ children }) => {//props children obj pass akit und
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;//childern ok ayal mathe navigate pagek pogum illel error veru
};


export default ProtectedRoute;