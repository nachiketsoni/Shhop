import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


const ProtectedRoute = ({ adminCheck,children}) => {
const {isAuthenticated,admin}=useSelector((store)=>store.user);
if(!isAuthenticated){
  return <Navigate to="/auth"></Navigate>
}
if(adminCheck && !admin){
  return <Navigate to="/"></Navigate>
}
return children;
}

export default ProtectedRoute